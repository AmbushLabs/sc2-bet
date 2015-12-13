import {
    JOIN_GAME, SET_NOTIFICATION
} from './../../actions/actions';

const join = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: JOIN_GAME,
            is_fetching: true
        });
        return fetch('/game/' + game_id + '/join', {
            method:'post',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: JOIN_GAME,
                    is_fetching: false,
                    status: (json && json.error) ? 'error' : 'success',
                    data: json
                });
                if (!(json && json.error)) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        message: 'Successfully joined the contest!'
                    });
                }
            }
        );
    };
};

export default join;