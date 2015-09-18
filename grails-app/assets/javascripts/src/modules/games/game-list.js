import React from './../../lib/react';
import GameCard from "./game-card";

var GameList = React.createClass({
    render: function() {
        var gameNodes = this.props.games.map(function(game) {
            return (
                <GameCard characterName={game.creator.display_name}
                          primaryRace={game.creator.primary_race}
                          highest1v1Rank={game.creator.highest_1v1_rank}
                          wager={game.wager} />
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
            url:'/game/list',
            success: $.proxy(function(resp) {
                this.setProps({games:resp});
            },this)
        });
    }
});

export default GameList;