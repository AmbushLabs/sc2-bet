import {
    INITIALIZE_APP,
    ADD_EMAIL_ADDRESS,
    CREATE_GAME,
    JOIN_GAME,
    FETCH_REPLAY_STATUS,
    LEAVE_GAME,
    PURCHASE_GOSU_COINS,
    CHECK_EMAIL_ADDRESS,
    CREATE_WITHDRAWL
} from './../actions/actions';

const gosuCoins = function(state = {remaining:0}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
        case CREATE_GAME:
        case JOIN_GAME:
        case LEAVE_GAME:
        case PURCHASE_GOSU_COINS:
        case FETCH_REPLAY_STATUS:
        case CREATE_WITHDRAWL:
            if (!action.isFetching && action.data) {
                return Object.assign({}, state, action.data.gosu_coins);
            }
        default:
            return state;
    }
    return state;
};

export default gosuCoins;