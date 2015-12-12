import {
    UPLOAD_REPLAY,
    FETCH_REPLAY_STATUS,
    FETCH_SINGLE_GAME
} from './../actions/actions';

const gameReplay = function(state = {}, action = {}) {
    switch(action.type) {
        case UPLOAD_REPLAY:
            return Object.assign({uploading:true}, state);
        case FETCH_REPLAY_STATUS:
            if (action.isFetching) {
                return Object.assign({uploading:true}, state);
            } else {
                if (action.data && !action.data.error && action.data.game_replay) {
                    return action.data.game_replay;
                } else {
                    return Object.assign({error:true}, state);
                }
            }
        case FETCH_SINGLE_GAME:
            if (action.data && !action.data.error && action.data.game_replay) {
                return action.data.game_replay;
            }
            break;

    }
    return state;
};

export default gameReplay;