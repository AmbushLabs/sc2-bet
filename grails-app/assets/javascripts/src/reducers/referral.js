import { INITIALIZE_APP, ADD_EMAIL_ADDRESS, CHECK_EMAIL_ADDRESS } from './../actions/actions';

const referral = function(state = { code: '' }, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
            if (!action.isFetching && action.data) {
                return Object.assign({}, state, action.data.referral);
            }
        default:
            return state;
    }
    return state;
};

export default referral;