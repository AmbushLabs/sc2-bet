import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import {
    routerStateReducer
} from 'redux-router';

import games from './games';
import user from './user';
import createGameModalVisible from './createGameModalVisible';
import loggedIn from './loggedIn';
import hasEmail from './hasEmail';
import notifications from './notifications';

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible,
    hasEmail: hasEmail,
    games: games,
    user: user,
    loggedIn: loggedIn,
    notifications: notifications
});

export default reducer;