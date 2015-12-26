import { INITIALIZE_APP, CHECK_EMAIL_ADDRESS, ADD_EMAIL_ADDRESS, FETCH_SINGLE_GAME } from './../actions/actions';

const s3 = function(state = {}, action = {}) {
    switch(action.type) {
        case INITIALIZE_APP:
        case CHECK_EMAIL_ADDRESS:
        case ADD_EMAIL_ADDRESS:
            if (!action.isFetching && action.data && action.data.s3) {
                return Object.assign({}, state, action.data.s3);
            }
    }
    return state;
};

export default s3;