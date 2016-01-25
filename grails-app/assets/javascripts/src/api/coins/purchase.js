import {
    PURCHASE_GOSU_COINS,
    SET_NOTIFICATION
} from './../../actions/actions';

const purchase = (token_id, token_email, price) => {
    return (dispatch) => {
        dispatch({
            type: PURCHASE_GOSU_COINS,
            isFetching: true
        });
        var fd = new FormData();
        fd.append('token_id', token_id);
        fd.append('token_email', token_email);
        fd.append('price', price);
        return fetch('/gosuCoin/purchase', {
            method: 'post',
            credentials: 'include',
            body: fd
        })
        .then(response => response.json())
        .then(json => {
                dispatch({
                    type: PURCHASE_GOSU_COINS,
                    isFetching: false,
                    status: 'success',
                    data: json
                });
                if (json.success) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        message: 'Gosu Coin purchase successful!'
                    });
                }
            }
        );
    }
};

export default purchase;