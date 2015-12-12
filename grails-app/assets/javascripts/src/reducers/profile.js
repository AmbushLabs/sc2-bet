import { FETCH_PROFILE } from './../actions/actions';

const user = function(state = {}, action = {}) {
    switch(action.type) {
        case FETCH_PROFILE:
            if (!action.isFetching && action.data) {
                return Object.assign({}, state, action.data.user);
            }
        default:
            return state;
    }
    return state;
};

export default user;