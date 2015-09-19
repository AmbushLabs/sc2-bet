import React from './../../lib/react';
import GameCard from "./game-card";

var GameList = React.createClass({
    render: function() {
        var gameNodes = this.props.games.map(function(game) {
            return (
                <GameCard game={game} />
            );
        });
        return (
            <div className="clearfix">
                {gameNodes}
            </div>
        );
    },
    componentDidMount: function() {
        this.props.gameDispatcher.register($.proxy(function(games) {
            this.setProps({games:games});
        }, this));
        $.ajax({
            url:'/game/list/' + this.props.listType,
            success: $.proxy(function(resp) {
                this.setProps({games:resp});
            },this)
        });
    }
});

export default GameList;