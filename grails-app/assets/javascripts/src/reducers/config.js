import { INITIALIZE_APP, CHECK_EMAIL_ADDRESS, ADD_EMAIL_ADDRESS } from './../actions/actions';

const config = function(state = {}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
            if (!action.isFetching && action.data && action.data.config) {
                return Object.assign({}, state, action.data.config);
            }
    }
    return state;
};

export default config;