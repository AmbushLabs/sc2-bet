import {
    FETCH_PROFILE
} from './../actions/actions';

const gamesPlayed = function(state = [], action = {}) {
    switch(action.type) {
        case FETCH_PROFILE:
            return action.data.games_played;
    }
    return state;
};

export default gamesPlayed;