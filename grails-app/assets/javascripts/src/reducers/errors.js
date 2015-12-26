import {
    CREATE_GAME,
    JOIN_GAME,
    CLEAR_ERRORS
} from './../actions/actions';

import errorMessages from './errors/errors-messages';

const errors = function(state = [], action = {}) {
    switch(action.type) {
        case CREATE_GAME:
        case JOIN_GAME:
            if (action && action.data && action.data.error) {
                return [{
                    error: true,
                    reasonType: action.data.error_reason,
                    errorDetail: errorMessages(action.data.error_reason)
                }];
            }
        break;
        case CLEAR_ERRORS:
            return [];
        break;
    }

    return state;
};

export default errors;