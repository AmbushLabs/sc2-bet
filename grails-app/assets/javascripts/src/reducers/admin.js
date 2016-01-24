import {
    ADMIN_INITIALIZE,
    SHOW_PROCESS_WITHDRAWL_MODAL,
    HIDE_PROCESS_WITHDRAWL_MODAL
} from './../actions/actions';

export default (state = {
    authorized: false,
    withdrawl_requests: [],
    recent_transactions: [],
    withdrawl_request_modal: {
        show: false,
        withdrawl_request: null
    }
}, action = {}) => {
    switch(action.type) {
        case ADMIN_INITIALIZE:
            if (action && !action.isFetching) {
                return Object.assign({}, state, action.data.admin);
            }
        break;
        case SHOW_PROCESS_WITHDRAWL_MODAL:
            return Object.assign({}, state, {
                withdrawl_request_modal: {
                    show: true,
                    withdrawl_request: action.data.withdrawl_request
                }
            });
        case HIDE_PROCESS_WITHDRAWL_MODAL:
            return Object.assign({}, state, {
                withdrawl_request_modal: {
                    show: false,
                    withdrawl_request: null
                }
            });
    }

    return state;
};