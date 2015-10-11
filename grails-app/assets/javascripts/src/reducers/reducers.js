import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import {
    routerStateReducer
} from 'redux-router';

import games from './games';
import createGameModalVisible from './createGameModalVisible';

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible,
    games: games
});

export default reducer;