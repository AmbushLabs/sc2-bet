import { INITIALIZE_APP } from './../actions/actions';

const config = function(state = {}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
            if (!action.isFetching && action.data && action.data.config) {
                return Object.assign({}, state, action.data.config);
            }
    }
    return state;
};

export default config;