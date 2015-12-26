import { INITIALIZE_APP, ADD_EMAIL_ADDRESS, CHECK_EMAIL_ADDRESS } from './../actions/actions';

const user = function(state = {}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
            if (!action.isFetching && action.data) {
                return Object.assign({}, state, action.data.user);
            }
        default:
            return state;
    }
    return state;
};

export default user;