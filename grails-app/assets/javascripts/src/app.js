import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';
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

import Messages from './messages';
import NavBar from './modules/nav/nav-bar';
import Dashboard from './modules/dashboard/dashboard';
import CreateGameModal from './modules/create-game/modal';

@connect(state => (state))
class App extends Component {

    static mixins = [ReactIntl.IntlMixin];

    componentDidMount() {
        /*
         this.getExternalProps().myGameDispatcher.register($.proxy(function(payload) {
         //myGameData = payload;
         this.setState({something:false}); //he this is not ok, but works for now
         },this));
         this.getExternalProps().searchGameDispatcher.register($.proxy(function(payload) {
         //searchGameData = payload;
         this.setState({something:false});
         },this));
         */
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
                <NavBar //gameDispatcher={this.getExternalProps().myGameDispatcher}
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
                //gameDispatcher={this.getExternalProps().myGameDispatcher}
                />
        );
    }
};

const initialState = {
    createGameModalVisible: false
};

const createGameModalVisible = function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_CREATE_GAME_MODAL':
            return true;
        case 'HIDE_CREATE_GAME_MODAL':
            return false;
        default:
            return false;
    }
};

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible
});

const store = compose(
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