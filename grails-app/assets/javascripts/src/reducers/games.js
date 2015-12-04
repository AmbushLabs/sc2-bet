import {
    FETCH_GAMES,
    FETCH_ALL_GAMES,
    FETCH_SINGLE_GAME,
    CREATE_GAME,
    JOIN_GAME,
    CANCEL_GAME,
    ACCEPT_CHALLENGER,
    REJECT_CHALLENGER,
    INITIALIZE_APP,
    ADD_EMAIL_ADDRESS,
    CHANGE_GAME_FILTER,
    LEAVE_GAME,
    SHOW_SHARE_GAME_MODAL,
    HIDE_SHARE_GAME_MODAL
} from './../actions/actions';

const games = (state = {}, action = {}) => {
    switch(action.type) {
        case FETCH_GAMES:
            if (action.is_fetching || action.error) {
                return state;
            }
            switch(action.status) {
                case 'success':
                    return Object.assign({}, state, action.data.games);
                    break;
            }
            break;
        case FETCH_SINGLE_GAME:
            switch(action.status) {
                case 'success':
                    return Object.assign({}, state, {
                        all: cloneGamesAndUpdate(state.all, action.data.game)
                    });
                    break;
            }
            break;
        case INITIALIZE_APP:
        case ADD_EMAIL_ADDRESS:
            if (action.is_fetching || action.error) {
                return state;
            }
            switch(action.status) {
                case 'success':
                    return Object.assign({}, state, action.data.games);
                    break;
            }
            break;
        case CREATE_GAME:
            if (action.is_fetching || (action.data && action.data.error)) {
                return state;
            } else if (!action.is_fetching) {
                switch(action.status) {
                    case 'success':
                        return Object.assign({}, state, {
                            created: Object.assign({}, state.created, {ids:[action.data.game.id, ...state.created.ids]}),
                            created_or_joined: Object.assign({}, state.created_or_joined, {ids:[action.data.game.id, ...state.created_or_joined.ids]}),
                            all: cloneGamesAndUpdate(state.all, action.data.game)
                        });
                        break;
                }
            }
            break;
        case JOIN_GAME:
            if (action.is_fetching && action.game_id) {
                return Object.assign({}, state, {
                    all: setGameFetching(state.all, action.game_id, getFetchTypeFromType(action.type))
                });
            } else if (!action.is_fetching) {
                switch (action.status) {
                    case 'success':
                        let newArr = state.waiting.ids.slice(0);
                        newArr.push(action.data.game.id);
                        return Object.assign({}, state, {
                            all: cloneGamesAndUpdate(state.all, action.data.game),
                            waiting: {
                                count: ++state.waiting.count,
                                ids: newArr
                            }
                        });
                        break;
                }
            }
            break;
        case LEAVE_GAME:
            if (action.is_fetching && action.game_id) {
                return Object.assign({}, state, {
                    all: setGameFetching(state.all, action.game_id, getFetchTypeFromType(action.type))
                });
            } else if (!action.is_fetching) {
                switch (action.status) {
                    case 'success':
                        let newArr = state.waiting.ids.slice(0);
                        newArr.splice(newArr.indexOf(action.data.game.id), 1);
                        return Object.assign({}, state, {
                            all: cloneGamesAndUpdate(state.all, action.data.game),
                            waiting: {
                                count: --state.waiting.count,
                                ids: newArr
                            }
                        });
                        break;
                }
            }
            break;
            break;
        case CANCEL_GAME:
        case ACCEPT_CHALLENGER:
        case REJECT_CHALLENGER:
            if (action.is_fetching && action.game_id) {
                return Object.assign({}, state, {
                    all: setGameFetching(state.all, action.game_id, getFetchTypeFromType(action.type))
                });
            } else if (!action.is_fetching) {
                switch (action.status) {
                    case 'success':
                        let newArr = state.to_approve.ids.slice(0);
                        newArr.splice(newArr.indexOf(action.data.game.id), 1);
                        return Object.assign({}, state, {
                            all: cloneGamesAndUpdate(state.all, action.data.game),
                            to_approve: {
                                count: --state.to_approve.count,
                                ids: newArr
                            }
                        });
                        break;
                }
            }
            break;
        case CHANGE_GAME_FILTER:
            return Object.assign({}, state, { selected_rank: action.data.selectedRank });
        case SHOW_SHARE_GAME_MODAL: {
            const gameUpdated = Object.assign({}, state.all[action.data.gameId], { show_share_modal: true });
            return Object.assign({}, state, {
                all: cloneGamesAndUpdate(state.all, gameUpdated)
            });
        }
        case HIDE_SHARE_GAME_MODAL: {
            const gameUpdated = Object.assign({}, state.all[action.data.gameId], { show_share_modal: false });
            return Object.assign({}, state, {
                all: cloneGamesAndUpdate(state.all, gameUpdated)
            });
        }
    }
    return state;
};

const cloneGamesAndUpdate = (games_in = {}, game = {}) => {
    let games = Object.assign({}, games_in);
    games[game.id] = game;
    return games;
};

const setGameFetching = (games_in = {}, game_id = {}, second_prop = null) => {
    let games = Object.assign({}, games_in);
    games[game_id]['is_fetching'] = true;
    if (!_.isNull(second_prop) && !_.isUndefined(second_prop)) {
        games[game_id][second_prop] = true;
    }
    return games;
};

const getFetchTypeFromType = (type) => {
    switch(type) {
        case CANCEL_GAME:
            return 'is_cancelling';
        case ACCEPT_CHALLENGER:
            return 'is_accepting';
        case JOIN_GAME:
            return 'is_joining';
        case REJECT_CHALLENGER:
            return 'is_rejecting';
        case LEAVE_GAME:
            return 'is_leaving';
    }
}

export default games;