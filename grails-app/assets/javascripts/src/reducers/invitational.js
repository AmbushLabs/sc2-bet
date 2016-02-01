import { INITIALIZE_APP, JOIN_TOURNAMENT, ADD_EMAIL_ADDRESS, CHECK_EMAIL_ADDRESS } from './../actions/actions';

const invitational = function(state = { joined: false }, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case JOIN_TOURNAMENT:
        case ADD_EMAIL_ADDRESS:
        case CHECK_EMAIL_ADDRESS:
            if (!action.isFetching && action.data && action.data.invitational) {
                return Object.assign({}, state, action.data.invitational);
            }
    }
    return state;
};

export default invitational;