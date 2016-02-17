import {
    REJECT_CHALLENGER
} from './../../actions/actions';

const reject = (game_id, csrf) => {
    return (dispatch) => {
        dispatch({
            type: REJECT_CHALLENGER,
            is_fetching: true,
            game_id: game_id
        });
        return fetch('/game/' + game_id + '/reject?csrf=' + csrf, {
            method:'post',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: REJECT_CHALLENGER,
                    is_fetching: false,
                    status: 'success',
                    data: json
                })
        );
    }
};

export default reject;