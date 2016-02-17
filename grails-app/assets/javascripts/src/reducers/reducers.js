import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import {
    routerStateReducer
} from 'redux-router';

import games from './games';
import user from './user';
import createGameModalVisible from './createGameModalVisible';
import loggedIn from './loggedIn';
import hasEmail from './hasEmail';
import hasLoaded from './hasLoaded';
import notifications from './notifications';
import errors from './errors';
import gosuCoins from './gosuCoins';
import s3 from './s3';
import config from './config';
import profile from './profile';
import gameReplay from './gameReplay';
import gamesPlayed from './gamesPlayed';
import withdrawls from './withdrawls';
import invitational from './invitational';
import csrf from './csrf';
import referral from './referral';
import admin from './admin';

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible,
    hasEmail: hasEmail,
    games: games,
    user: user,
    loggedIn: loggedIn,
    hasLoaded: hasLoaded,
    notifications: notifications,
    errors: errors,
    gosuCoins: gosuCoins,
    s3: s3,
    config: config,
    profile: profile,
    gameReplay: gameReplay,
    gamesPlayed: gamesPlayed,
    withdrawls: withdrawls,
    invitational: invitational,
    csrf: csrf,
    referral: referral,
    admin: admin
});

export default reducer;