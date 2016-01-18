import {
    ACCEPT_CHALLENGER
} from './../../actions/actions';

const accept = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: ACCEPT_CHALLENGER,
            is_fetching: true,
            game_id: game_id
        });
        return fetch('/game/' + game_id + '/accept', {
            method:'post',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: ACCEPT_CHALLENGER,
                    is_fetching: false,
                    status: 'success',
                    data: json
                })
        );
    };
};

export default accept;