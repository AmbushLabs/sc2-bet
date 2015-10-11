import { INITIALIZE_APP } from './../actions/actions';

const user = function(state = false, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
            if (!action.is_fetching) {
                return Object.assign({}, state, action.data.user);
            }
        default:
            return state;
    }
    return state;
};

export default user;