import './lib/jquery';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import ReactIntl from 'react-intl';

import { createStore, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import {
    ReduxRouter,
    routerStateReducer,
    reduxReactRouter
} from 'redux-react-router';

import createHistory from 'history/lib/createBrowserHistory';

//import Dispatcher from './lib/dispatcher';
import Messages from './messages';
import NavBar from './modules/nav/nav-bar';
import Dashboard from './modules/dashboard/dashboard';
import CreateGameModal from './modules/create-game/modal';
import GamePage from "./modules/games/game-page";

var $main_body = $('#main_body');
if ($main_body.length > 0) {

    const select = function(state) {
        return state;
    };

    class App extends Component {

        static mixins = [ReactIntl.IntlMixin];

        getInitialState() {
            return {
                showModal: false,
                something: true
            };
        }

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
            console.log(dispatch);
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

    const reducers = combineReducers({
        createGameModalVisible
    });
    /*
     const routes = (
     <IndexRoute component={Dashboard} />
     <Route path="/w/:id" component={GamePage} />
     );

     const routes = (
     <Route path="/" component={App}>
     <IndexRoute component={Dashboard} />
     <Route path="/w/:id" component={GamePage} />
     </Route>
     );
     */
    const routes = (
        <Route path="/" component={App}>

        </Route>
    );


    let store = compose(
        reduxReactRouter({
            createHistory,
            routes
        }),
        devTools()
    )(createStore)(reducers);

    //const store = configureStore(reducers, initialState);

    let history = createHistory();

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
    };


    ReactDOM.render(<Root />, document.getElementById('main_body'));
}