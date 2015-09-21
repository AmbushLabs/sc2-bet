import React from './../../lib/react';
import ReactIntl from './../../lib/react-intl';
import GameList from './../games/game-list';

var MyGames = React.createClass({
    mixins: [ReactIntl.IntlMixin],
    getInitialState: function() {
        return {current_tab: 'created_or_joined'};
    },
    render: function () {
        return (
            <section>
                <div className="my1 mxn1 h6">
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('created_or_joined')}
                       onClick={this.getGames}
                       data-list-type="created_or_joined">All My Games</a>
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('to_approve')}
                       onClick={this.getGames}
                       data-list-type="to_approve">To Approve</a>
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('created')}
                       onClick={this.getGames}
                       data-list-type="created">Created</a>
                </div>
                <GameList gameData={this.props.myGameData}
                    gameDispatcher={this.props.gameDispatcher}
                    colSize="col-6"
                    listType="created_or_joined"
                    showModal={this.props.showModal}
                    limit={4}
                    />
            </section>
        );
    },
    isSelected: function(type) {
        if (type == this.state.current_tab) {
            return 'blue';
        }
        return '';
    },
    getGames:function(ev) {
        var type = $(ev.currentTarget).data('list-type');
        if (type == this.state.current_tab) {
            return;
        }
        $.ajax({
            url:'/game/list/' + type,
            success:$.proxy(function(resp) {
                this.props.gameDispatcher.dispatch(resp);
                this.setState({current_tab:type});
            },this)
        })
    }
});

export default MyGames;