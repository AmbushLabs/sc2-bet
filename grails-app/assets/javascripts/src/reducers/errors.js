import {
    FETCH_GAMES,
    FETCH_ALL_GAMES,
    FETCH_SINGLE_GAME,
    CREATE_GAME,
    JOIN_GAME,
    CANCEL_GAME,
    ACCEPT_CHALLENGER,
    REJECT_CHALLENGER,
    INITIALIZE_APP
} from './../actions/actions';

const errors = function(state = {error: false, reasonType: ''}, action = {}) {
    switch(action.type) {
        case CREATE_GAME:
            if (action && action.data && action.data.error) {
                return {
                    error: true,
                    reasonType: action.data.error_reason
                };
            }
        break;
    }

    return state;
};

export default errors;