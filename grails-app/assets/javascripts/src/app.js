import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import ReactIntl from 'react-intl';

import {
    ReduxRouter,
    reduxReactRouter
} from 'redux-router';

import { Route, Link, IndexRoute } from 'react-router';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from '../../../../node_modules/react-router/node_modules/history/lib/createBrowserHistory';

import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import reducers from './reducers/reducers';

import * as Actions from './actions/actions';

import NavBar from './modules/nav/nav-bar';
import Dashboard from './modules/dashboard/dashboard';
import CreateGameModal from './modules/create-game/modal';
import WagerPage from './modules/wager-page/wager-page';


@connect(state => (state))
class App extends Component {

    render() {
        const { dispatch } = this.props;
        return (
            <section>
                <NavBar
                    showModal={() => dispatch({type:Actions.SHOW_CREATE_GAME_MODAL})} />
                {this.getChildren()}
                {this.buildModal()}
            </section>
        );
    }
    getChildren() {
        if (_.isUndefined(this.props.children) || _.isNull(this.props.children)) {
            return;
        }
        var { children, ...extraProps } = this.props;
        return React.cloneElement(children, extraProps);
    }
    buildModal() {
        if (!this.props.createGameModalVisible) {
            return;
        }

        const { dispatch } = this.props;
        return (
            <CreateGameModal
                hideModal={() => dispatch({type:Actions.HIDE_CREATE_GAME_MODAL})}
                />
        );
    }
};

const middleware = [thunk];

const store = compose(
    applyMiddleware(...middleware),
    reduxReactRouter({ createHistory }),
    devTools()
)(createStore)(reducers);

const debugPanel = (
    <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
);

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>
                            <IndexRoute component={Dashboard} />
                            <Route path="/w/:id" component={WagerPage} />
                        </Route>
                    </ReduxRouter>
                </Provider>
                {/*debugPanel*/}
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('main_body'));