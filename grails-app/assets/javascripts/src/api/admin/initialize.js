import {
    ADMIN_INITIALIZE
} from './../../actions/actions';

export default (csrf) => {
    return (dispatch) => {
        dispatch({
            type: ADMIN_INITIALIZE,
            isFetching: true
        });
        return fetch('/admin/initialize?csrf=' + csrf, {
            method: 'get',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: ADMIN_INITIALIZE,
                    isFetching: false,
                    status: 'success',
                    data: json
                })
        );
    }
};