import {
    FETCH_REPLAY_STATUS
} from './../../actions/actions';

const replayStatus = (game_id, csrf) => {
    return (dispatch) => {
        fetch('/game/replay/' + game_id + '?csrf=' + csrf, {
            method:'get',
            credentials:'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: FETCH_REPLAY_STATUS,
                    status:'success',
                    isFetching: false,
                    data: json
                })
        );
    }
}

export default replayStatus;