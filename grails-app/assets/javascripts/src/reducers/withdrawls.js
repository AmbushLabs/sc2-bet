import {
    CREATE_WITHDRAWL,
    GET_WITHRDAWLS
} from './../actions/actions';

export default (state = { isCreating: false, isGetting: false }, action = {}) => {
    switch(action.type) {
        case CREATE_WITHDRAWL:
        case GET_WITHRDAWLS:
            if (action && !action.isFetching) {
                return Object.assign({},
                    action.data.withdrawls,
                    {isCreating: false, isGetting: false});
            }
        case CREATE_WITHDRAWL:
            return Object.assign({}, state, {isCreating: true, isGetting: false});
        case GET_WITHRDAWLS:
            return Object.assign({}, state, {isGetting: true, isCreating: false});
    }

    return state;
};