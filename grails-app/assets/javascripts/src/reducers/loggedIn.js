import { INITIALIZE_APP } from './../actions/actions';

const loggedIn = function(state = false, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
            if (action.is_fetching) {
                return state;
            }
            return action.data.logged_in;
    }
    return state;
};

export default loggedIn;