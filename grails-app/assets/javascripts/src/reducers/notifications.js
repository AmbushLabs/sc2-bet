import {
    SET_NOTIFICATION,
    CLEAR_NOTIFICATION
} from './../actions/actions';

const notifications = function(state = {show: false, message: ''}, action = {}) {
    switch(action.type) {
        case SET_NOTIFICATION:
            return Object.assign({}, state, { message: action.message, show: true });
        case CLEAR_NOTIFICATION:
            return Object.assign({}, state, { message: '', show: false });
    }
    return state;
};

export default notifications;