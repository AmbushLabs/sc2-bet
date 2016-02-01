import {
    JOIN_TOURNAMENT, SET_NOTIFICATION
} from './../../actions/actions';

const join = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: JOIN_TOURNAMENT,
            is_fetching: true
        });
        return fetch('/user/invitational', {
            method:'post',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: JOIN_TOURNAMENT,
                    is_fetching: false,
                    status: (json && json.success) ? 'success' : 'error',
                    data: json
                });
                if (!(json && json.error)) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        message: 'Successfully joined the tournament!'
                    });
                }
            }
        );
    };
};

export default join;