import {
    GET_WITHRDAWLS
} from './../../actions/actions';

export default (csrf) => {
    return (dispatch) => {
        dispatch({
            type: GET_WITHRDAWLS,
            isFetching: true
        });
        return fetch('/gosuCoin/withdrawlsList?csrf=' + csrf, {
            method: 'get',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: GET_WITHRDAWLS,
                    isFetching: false,
                    status: 'success',
                    data: json
                })
        );
    }
};