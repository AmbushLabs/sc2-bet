import { INITIALIZE_APP, FETCH_SINGLE_GAME } from './../actions/actions';

const s3 = function(state = {}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
            if (!action.isFetching && action.data && action.data.s3) {
                return Object.assign({}, state, action.data.s3);
            }
    }
    return state;
};

export default s3;