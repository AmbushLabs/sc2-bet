import React from './../../lib/react';
import GameCard from "./game-card";
import ReactIntl from './../../lib/react-intl';

var GameList = React.createClass({
    mixins:[ReactIntl.IntlMixin],
    render: function() {
        if (_.isNull(this.props.games) || this.props.games.length == 0) {
            return (
                <div className={"col " + this.props.colSize}>
                    <p>{this.getIntlMessage('NO_ACTIVE_GAMES')}</p>
                    <button className="btn btn-primary mb1 mt1 bg-blue mr1 col-11" onClick={this.props.showModal}>
                        {this.getIntlMessage('CREATE_GAME')}
                    </button>
                </div>
            );
        }
        var gameNodes = this.props.games.map($.proxy(function(game) {
            return (
                <GameCard game={game} colSize={this.props.colSize} />
            );
        }, this));
        return (
            <div className="clearfix">
                {gameNodes}
            </div>
        );
    },
    componentDidMount: function() {
        $.ajax({
            url:'/game/list/' + this.props.listType,
            success: $.proxy(function(resp) {
                this.props.gameDispatcher.dispatch(resp);
            },this)
        });
    }
});

export default GameList;