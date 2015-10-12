import { CHECK_EMAIL_ADDRESS, INITIALIZE_APP, ADD_EMAIL_ADDRESS } from './../actions/actions';

const hasEmail = function(state = false, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
            if (action.is_fetching) {
                return state;
            }
            if (action.data && !_.isUndefined(action.data.has_email) && !_.isNull(action.data.has_email)) {
                return action.data.has_email;
            }

    }
    return state;
};

export default hasEmail;