import {
    CREATE_WITHDRAWL,
    SET_NOTIFICATION
} from './../../actions/actions';

export default (gcWithdrawlAmount, bcWalletId) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_WITHDRAWL,
            isFetching: true
        });
        var fd = new FormData();
        fd.append('gosu_coin_withdrawl_amount', gcWithdrawlAmount);
        fd.append('bit_coin_wallet_id', bcWalletId);

        return fetch('/gosuCoin/withdrawlRequest', {
            method: 'post',
            credentials: 'include',
            body: fd
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: CREATE_WITHDRAWL,
                    isFetching: false,
                    status: 'success',
                    data: json
                });
                if (json.success) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        message: 'Gosu Coin withdrawl initiated! You will receive an e-mail when it is completed.'
                    });
                }
            }
        );
    }
};