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
import GameCard from "./modules/games/game-card";

var $main_body = $('#main_body');
if ($main_body.length > 0) {
    var searchGameDispatcher = new Dispatcher();
    var myGameDispatcher = new Dispatcher();
    var searchGameData = {games:[]};
    var myGameData = {games:[]};

    var App = React.createClass({
        mixins: [ReactIntl.IntlMixin],
        getInitialState: function() {
            return {showModal: false};
        },
        componentDidMount: function() {
            this.getExternalProps().myGameDispatcher.register($.proxy(function(payload) {
                this.setProps({myGameData:payload});
            },this));
            this.getExternalProps().searchGameDispatcher.register($.proxy(function(payload) {
                this.setProps({searchGameData:payload});
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
            console.log('props');
            console.log(this.props);
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
            <Route path="game" component={GameCard}/>
        </Route>
    );

    React.render(<Router routes={routes} />,
        document.body
    );

    //let history = createBrowserHistory();
    //React.render(<Router history={history}>{routes}</Router>, document.body);

    /*
    Router.run(routes, Router.HistoryLocation, function(Handler) {
        React.render(<Handler />, document.body);
    });
    */
}