import React from 'react';
import DateFormat from 'dateformat';

import GameCardUser from './../user/game-card-user';

export default ({ game, userId }) => {
    var opponent, profilePlayer, iconClass, resultTextColor, resultText;
    if (game.player1.user_id == userId) {
        opponent = game.player2;
        profilePlayer = game.player1;
    } else {
        opponent = game.player1;
        profilePlayer = game.player2;
    }
    if (profilePlayer.winner) {
        iconClass = 'ss-trophy winner-text';
        resultTextColor = 'winner-text';
        resultText = 'Win';
    } else {
        iconClass = 'ss-dislike black';
        resultTextColor = 'black';
        resultText = 'Loss';
    }

    const dateformatted = DateFormat(game.created, "mmm dS, yyyy");

    return (
        <div className="col col-12 border mb1 game-played">
            <a href={"/w/" + game.id}>
                <div className="circle gcu-avatar center bg-white">
                    <div className={"ss-icons h1 mt2 " + iconClass}></div>
                </div>
            </a>
            <div className="col col-12 gosu-blue-bg">
            <a href={"/w/" + game.id}>
                <div className="col col-4 p1 gcu-right-container">
                    <div className={"h6 silver"}>RESULT</div>
                    <div className={"h4 " + resultTextColor}>{resultText}</div>
                </div>
                <div className="col col-4 p1">
                    <div className={"h6 silver"}>AMOUNT</div>
                    <div className="h4 white"><a href={"/w/" + game.id}>{game.wager} GosuCoins</a></div>
                </div>
                <div className="col col-4 p1">
                    <div className={"h6 silver"}>DATE</div>
                    <div className="h4 white">{dateformatted}</div> 
                </div>
            </a>
            </div>
            <div className="col col-12 gosu-light-blue-bg">
                <div className="col col-4 p1 gcu-right-container">
                    <div className={"h6 gray"}>OPPONENT</div>
                    <div className="h4 white"><a href={"/p/" + opponent.user_id}>{opponent.display_name}</a></div>
                </div>
                <div className="col col-4 p1">
                    <div className="h6 gray">RACE</div>
                    <div className="h6">{opponent.primary_race}</div>
                </div>
                <div className="col col-4 p1">
                    <div className="h6 gray">RANK</div>
                    <div className="h6">{opponent.highest_1v1_rank}</div>
                </div>
            </div>
        </div>
    );
}