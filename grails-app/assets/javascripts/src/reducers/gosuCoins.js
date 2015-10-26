import { INITIALIZE_APP, CREATE_GAME, JOIN_GAME, PURCHASE_GOSU_COINS } from './../actions/actions';

const gosuCoins = function(state = {remaining:0}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CREATE_GAME:
        case JOIN_GAME:
        case PURCHASE_GOSU_COINS:
            if (!action.isFetching && action.data) {
                return Object.assign({}, state, action.data.gosu_coins);
            }
        default:
            return state;
    }
    return state;
};

export default gosuCoins;