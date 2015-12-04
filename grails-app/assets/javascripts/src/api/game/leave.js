import {
    LEAVE_GAME
} from './../../actions/actions';

const leave = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: LEAVE_GAME,
            is_fetching: true
        });
        return fetch('/game/' + game_id + '/leave', {
            method:'post',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: LEAVE_GAME,
                    is_fetching: false,
                    status: 'success',
                    data: json
                })
        );
    };
};

export default leave;