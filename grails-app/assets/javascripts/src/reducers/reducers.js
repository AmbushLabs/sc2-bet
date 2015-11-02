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
import errors from './errors';
import gosuCoins from './gosuCoins';
import s3 from './s3';

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible,
    hasEmail: hasEmail,
    games: games,
    user: user,
    loggedIn: loggedIn,
    notifications: notifications,
    errors: errors,
    gosuCoins: gosuCoins,
    s3: s3
});

export default reducer;