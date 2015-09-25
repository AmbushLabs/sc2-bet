import './lib/jquery';
import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import ReactRouter from 'react-router';
import ReactIntl from 'react-intl';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Dispatcher from './lib/dispatcher';
import Messages from './messages';
import NavBar from './modules/nav/nav-bar';
import Dashboard from './modules/dashboard/dashboard';
import CreateGameModal from './modules/create-game/modal';
import GamePage from "./modules/games/game-page";

var $main_body = $('#main_body');
if ($main_body.length > 0) {
    var searchGameDispatcher = new Dispatcher();
    var myGameDispatcher = new Dispatcher();
    var searchGameData = {games:[]};
    var myGameData = {games:[]};

    var App = React.createClass({
        mixins: [ReactIntl.IntlMixin],
        getInitialState: function() {
            return {
                showModal: false,
                something: true
            };
        },
        componentDidMount: function() {
            this.getExternalProps().myGameDispatcher.register($.proxy(function(payload) {
                myGameData = payload;
                this.setState({something:false}); //he this is not ok, but works for now
            },this));
            this.getExternalProps().searchGameDispatcher.register($.proxy(function(payload) {
                searchGameData = payload;
                this.setState({something:false});
            },this));
        },
        getExternalProps: function() {
            return {
                locales: ['en-US'],
                messages: Messages['en-US'],
                myGameData: myGameData,
                myGameDispatcher: myGameDispatcher,
                searchGameData: searchGameData,
                searchGameDispatcher: searchGameDispatcher
            };
        },
        render: function() {
            return (
                <section>
                    <NavBar gameDispatcher={this.getExternalProps().myGameDispatcher}
                            showModal={this.showModal} />
                    {this.getChildren()}
                    {this.buildModal()}
                </section>
            );
        },
        getChildren: function() {
            if (_.isUndefined(this.props.children) || _.isNull(this.props.children)) {
                return;
            }
            var extraProps = this.getExternalProps();
            return React.cloneElement(this.props.children, extraProps);
        },
        buildModal: function() {
            if (!this.state.showModal) {
                return;
            }
            return (
                <CreateGameModal hideModal={this.hideModal} gameDispatcher={this.getExternalProps().myGameDispatcher} />
            );
        },
        showModal: function() {
            this.setState({showModal:true});
        },
        hideModal: function() {
            this.setState({showModal:false});
        }
    });

    var routes = (
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="/w/:id" component={GamePage} />
        </Route>
    );

    let history = createBrowserHistory();

    React.render(<Router routes={routes} history={history} />,
        document.body
    );


    //React.render(<Router history={history}>{routes}</Router>, document.body);

    /*
    Router.run(routes, Router.HistoryLocation, function(Handler) {
        React.render(<Handler />, document.body);
    });
    */
}