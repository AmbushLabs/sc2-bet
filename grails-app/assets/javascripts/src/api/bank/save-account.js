import {
    LINK_BANK_ACCOUNT
} from './../../actions/actions';

const purchase = (routing_number, account_number, country_code, csrf) => {
    return (dispatch) => {
        dispatch({
            type: LINK_BANK_ACCOUNT,
            isFetching: true
        });
        var fd = new FormData();
        fd.append('routing_number', routing_number);
        fd.append('account_number', account_number);
        fd.append('country_code', country_code);
        fd.append('csrf', csrf);
        return fetch('/bank/account', {
            method: 'post',
            credentials: 'include',
            body: fd
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type: LINK_BANK_ACCOUNT,
                isFetching: false,
                status: 'success',
                data: json
            })
        );
    }
};

export default purchase;