import {
    PROCESS_WITHDRAWL,
    SET_NOTIFICATION
} from './../../actions/actions';

export default (gosuCoinWithdrawlRequestId, bitCoinAmount, csrf) => {
    return (dispatch) => {
        dispatch({
            type: PROCESS_WITHDRAWL,
            isFetching: true
        });
        var fd = new FormData();
        fd.append('gosu_coin_withdrawl_request_id', gosuCoinWithdrawlRequestId);
        fd.append('bit_coin_amount', bitCoinAmount);
        fd.append('csrf', csrf);

        return fetch('/admin/processWithdrawlRequest', {
            method: 'post',
            credentials: 'include',
            body: fd
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: PROCESS_WITHDRAWL,
                    isFetching: false,
                    status: 'success',
                    data: json
                });
                if (json.success) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        message: 'Gosu Coin withdrawl processed.'
                    });
                }
            }
        );
    }
};