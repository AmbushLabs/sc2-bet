import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import {
    routerStateReducer
} from 'redux-router';

import games from './games';
import user from './user';
import createGameModalVisible from './createGameModalVisible';
import loggedIn from './loggedIn';

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible,
    games: games,
    user: user,
    loggedIn: loggedIn
});

export default reducer;