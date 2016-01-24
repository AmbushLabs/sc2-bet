import 'fetch-polyfill';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

import {
    ReduxRouter,
    reduxReactRouter
} from 'redux-router';

import { Route, Link, IndexRoute } from 'react-router';
import { Provider, connect } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';

import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import reducers from './reducers/reducers';

import * as Actions from './actions/actions';

import NavBar from './modules/nav/nav-bar';
import ErrorToast from './modules/error-toast/error';
import Dashboard from './modules/dashboard/dashboard';
import EnterEmailModal from './modules/sign-up/enter-email-modal';
import WagerPage from './modules/wager-page/wager-page';
import GosuCoins from './modules/payments/gosu-coins';
import LandingPage from './modules/landing/landing-page';
import PageNotification from './modules/notifications/page-notification';
import Footer from './modules/footer/footer';
import ProfilePage from './modules/profile-page/profile-page';
import Admin from './modules/admin/admin';


@connect(state => (state))
class App extends Component {

    constructor(options) {
        super(options);
        this.getChildren = this.getChildren.bind(this);
        this.buildEmailModal = this.buildEmailModal.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.props.dispatch(initializeApp())
            .then(() =>
                {}
        );

    }

    render() {
        const { dispatch } = this.props;
        if (!this.props.hasLoaded) {
            return (<div>&nbsp;</div>); //TODO: LOADING
        }
        return (
            <section>
                <NavBar
                    loggedIn={this.props.loggedIn}
                    remainingTokens={this.props.gosuCoins.remaining}
                    dispatch={dispatch}
                    />
                <PageNotification
                    text={this.props.notifications.message}
                    show={this.props.notifications.show}
                    dispatch={dispatch}
                    />
                <ErrorToast
                    errors={this.props.errors}
                    dispatch={dispatch} />
                {this.getChildren()}
                {this.buildEmailModal()}
                <Footer
                    loggedIn={this.props.loggedIn}
                    />
            </section>
        );
    }

    getChildren() {
        if ((!this.props.loggedIn || !this.props.hasEmail) && document.location.href.indexOf("/w/") == -1) {
            return (
                <LandingPage
                    dispatch={this.props.dispatch} />
            );
        } else {
            if (_.isUndefined(this.props.children) || _.isNull(this.props.children)) {
                return;
            }
            var { children, ...extraProps } = this.props;
            return React.cloneElement(children, extraProps);
        }
    }

    buildEmailModal() {
        if (this.props.hasEmail || !this.props.loggedIn) {
            return;
        }
        const { dispatch } = this.props;
        return (
            <EnterEmailModal
                dispatch={dispatch}
                />
        );
    }
};

function initializeApp() {

    return function (dispatch) {
        dispatch({
            type:Actions.INITIALIZE_APP,
            is_fetching: true
        });

        return fetch('/main/initialize', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type:Actions.INITIALIZE_APP,
                    is_fetching: false,
                    status:'success',
                    data:json
                })
        );
    }
}

const middleware = [thunk];

const store = compose(
    applyMiddleware(...middleware),
    reduxReactRouter({ createHistory })
)(createStore)(reducers);


class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>
                            <IndexRoute component={Dashboard} />
                            <Route path="/w/:id" component={WagerPage} />
                            <Route path="/p/:id" component={ProfilePage} />
                            <Route path="/gosucoins" component={GosuCoins} />
                            <Route path="/admin" component={Admin} />
                        </Route>
                    </ReduxRouter>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('main_body'));