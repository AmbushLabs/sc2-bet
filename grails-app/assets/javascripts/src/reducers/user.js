import { INITIALIZE_APP } from './../actions/actions';

const user = function(state = {}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
            if (!action.isFetching && action.data) {
                return Object.assign({}, state, action.data.user);
            }
        default:
            return state;
    }
    return state;
};

export default user;