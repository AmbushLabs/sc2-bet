import {
    ADMIN_INITIALIZE
} from './../../actions/actions';

export default () => {
    return (dispatch) => {
        dispatch({
            type: ADMIN_INITIALIZE,
            isFetching: true
        });
        return fetch('/admin/initialize', {
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