import { INITIALIZE_APP, CHECK_EMAIL_ADDRESS, ADD_EMAIL_ADDRESS } from './../actions/actions';

const loggedIn = function(state = false, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
            if (action.is_fetching) {
                return state;
            }
            return action.data.logged_in;
    }
    return state;
};

export default loggedIn;