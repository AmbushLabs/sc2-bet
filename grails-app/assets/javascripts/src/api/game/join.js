import {
    JOIN_GAME, SET_NOTIFICATION
} from './../../actions/actions';

const join = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: JOIN_GAME,
            is_fetching: true,
            game_id: game_id
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
                    data: json,
                    game_id: game_id
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