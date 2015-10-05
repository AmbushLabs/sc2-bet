import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';

import {
    ReduxRouter,
    routerStateReducer,
    reduxReactRouter
} from 'redux-router';

import { Route, Link } from 'react-router';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from '../../../../node_modules/react-router/node_modules/history/lib/createBrowserHistory';

import Messages from './messages';
import NavBar from './modules/nav/nav-bar';

@connect(createGameModalVisible)
class App extends Component {

    //static mixins = [ReactIntl.IntlMixin];

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
        const { dispatch, createGameModalVisible } = this.props;
        console.log(this.props);
        console.log(this.state);
        console.log(this);
        return (
            <section>
                <NavBar //gameDispatcher={this.getExternalProps().myGameDispatcher}
                    showModal={this.showModal} />
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
        return (
            <CreateGameModal
                hideModal={this.hideModal}
                //gameDispatcher={this.getExternalProps().myGameDispatcher}
                />
        );
    }
    showModal() {
        this.setState({showModal:true});
    }
    hideModal() {
        this.setState({showModal:false});
    }
};

const initialState = {
    createGameModalVisible: false
};

const createGameModalVisible = function(state = initialState, action) {
    return state;
};

const reducer = combineReducers({
    router: routerStateReducer,
    createGameModalVisible: createGameModalVisible
});

const store = compose(
    reduxReactRouter({ createHistory }),
    devTools()
)(createStore)(reducer);

function createRouter() {
    return (
        <ReduxRouter>
            <Route path="/" component={App}>

            </Route>
        </ReduxRouter>
    );
}

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>

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