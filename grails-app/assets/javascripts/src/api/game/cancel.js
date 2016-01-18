import {
    CANCEL_GAME
} from './../../actions/actions';

const cancel = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: CANCEL_GAME,
            is_fetching: true,
            game_id: game_id

        });
        return fetch('/game/g/' + game_id, {
            method:'delete',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: CANCEL_GAME,
                    is_fetching: false,
                    status: 'success',
                    data: json
                })
        );
    };
};

export default cancel;