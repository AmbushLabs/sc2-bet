import './lib/jquery';
import Dispatcher from './lib/dispatcher';
import React from './lib/react';
import ReactIntl from './lib/react-intl';
import Messages from './messages';
import NavBar from './modules/nav/nav-bar';
import Dashboard from './modules/dashboard/dashboard';
import CreateGameModal from './modules/create-game/modal';

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
            this.props.myGameDispatcher.register($.proxy(function(payload) {
                this.setProps({myGameData:payload});
            },this));
            this.props.searchGameDispatcher.register($.proxy(function(payload) {
                this.setProps({searchGameData:payload});
            },this));
        },
        render: function() {
            return (
                <section>
                    <NavBar gameDispatcher={this.props.myGameDispatcher}
                            showModal={this.showModal} />
                    <Dashboard
                        myGameData={this.props.myGameData}
                        myGameDispatcher={this.props.myGameDispatcher}
                        searchGameData={this.props.searchGameData}
                        searchGameDispatcher={this.props.searchGameDispatcher}
                        showModal={this.showModal}
                        />
                    {this.buildModal()}
                </section>
            );
        },
        buildModal: function() {
            if (!this.state.showModal) {
                return;
            }
            return (
                <CreateGameModal hideModal={this.hideModal} gameDispatcher={this.props.myGameDispatcher} />
            );
        },
        showModal: function() {
            this.setState({showModal:true});
        },
        hideModal: function() {
            this.setState({showModal:false});
        }
    });

    React.render(
        <App
            locales={['en-US']}
            messages={Messages['en-US']}
            myGameData={myGameData}
            myGameDispatcher={myGameDispatcher}
            searchGameData={searchGameData}
            searchGameDispatcher={searchGameDispatcher}
            />,
        $main_body[0]
    );
}