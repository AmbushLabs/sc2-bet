import { SHOW_CREATE_GAME_MODAL, HIDE_CREATE_GAME_MODAL } from './../actions/actions';

const createGameModalVisible = function(state = false, action = {}) {
    switch(action.type) {
        case SHOW_CREATE_GAME_MODAL:
            return true;
        case HIDE_CREATE_GAME_MODAL:
            return false;
        default:
            return false;
    }
    return state;
};

export default createGameModalVisible;