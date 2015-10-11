import {
    JOIN_GAME
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
            .then(json =>
                dispatch({
                    type: JOIN_GAME,
                    is_fetching: false,
                    status: 'success',
                    data: json
                })
        );
    };
};

export default join;