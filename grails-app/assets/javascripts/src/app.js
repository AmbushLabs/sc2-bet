import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import ReactIntl from 'react-intl';

import {
    ReduxRouter,
    routerStateReducer,
    reduxReactRouter
} from 'redux-router';

import { Route, Link, IndexRoute } from 'react-router';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from '../../../../node_modules/react-router/node_modules/history/lib/createBrowserHistory';

import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import Messages from './messages';
import NavBar from './modules/nav/nav-bar';
import Dashboard from './modules/dashboard/dashboard';
import CreateGameModal from './modules/create-game/modal';

@connect(state => (state))
class App extends Component {

    componentDidMount() {
        console.log(this);
    }

    getExternalProps() {
        return {
            locales: ['en-US'],
            messages: Messages['en-US']
        };
    }

    render() {
        const { dispatch } = this.props;
        return (
            <section>
                <NavBar
                    showModal={() => dispatch({type:'SHOW_CREATE_GAME_MODAL'})} />
                {this.getChildren()}
                {this.buildModal()}
            </section>
        );
    }
    getChildren() {
        if (_.isUndefined(this.props.children) || _.isNull(this.props.children)) {
            return;
        }
        var extraProps = this.getExternalProps();
        return React.cloneElement(this.props.children, extraProps);
    }
    buildModal() {
        if (!this.props.createGameModalVisible) {
            return;
        }

        const { dispatch } = this.props;
        return (
            <CreateGameModal
                hideModal={() => dispatch({type:'HIDE_CREATE_GAME_MODAL'})}
                />
        );
    }
};

const initialState = {
    createGameModalVisible: false
};

const createGameModalVisible = function(state = false, action) {
    switch(action.type) {
        case 'SHOW_CREATE_GAME_MODAL':
            return true;
        case 'HIDE_CREATE_GAME_MODAL':
            return false;
        default:
            return false;
    }
    return state;
};

const games = function(state = { games: {} }, action) {
    switch(action.type) {
        case 'FETCH_GAMES':
            if (action.isFetching) {
                return state;
            }
            switch(action.status) {
                case 'SUCCESS':
                    return Object.assign({}, state, action.games.games);
                    break;
            }
            break;
        case 'FETCH_ALL_GAMES':
            if (action.isFetching) {
                return state;
            }
            switch(action.status) {
                case 'SUCCESS':
                    return Object.assign({}, state, action.games.games);
                    break;
            }
            break;
        case 'CREATE_GAME':
            if (action.isFetching) {
                return state;
            } else if (!action.isFetching) {
                switch(action.status) {
                    case 'success':
                        let myGames = Object.assign({}, state.my_games);
                        myGames[action.data.game.id] = action.data.game;
                        console.log(state);
                        console.log(action);
                        return Object.assign({}, state, {
                            created: Object.assign({}, state.created, {ids:[action.data.game.id, ...state.created.ids]}),
                            created_or_joined: Object.assign({}, state.created_or_joined, {ids:[action.data.game.id, ...state.created_or_joined.ids]}),
                            my_games: myGames
                        });
                        break;
                }
            }
            break;
    }
    return state;
};

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible,
    games: games
});

const middleware = [thunk];

const store = compose(
    applyMiddleware(...middleware),
    reduxReactRouter({ createHistory }),
    devTools()
)(createStore)(reducer);

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>
                            <IndexRoute component={Dashboard} />
                        </Route>
                    </ReduxRouter>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('main_body'));