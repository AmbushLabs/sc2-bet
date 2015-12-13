import React from 'react';
import GamePlayed from './game-played';

export default ({ games, user }) => {
    var gamesHtml, wins = 0, losses = 0;
    if (!games || games.length == 0) {
         gamesHtml = (
            <div>
                <p className="ss-icons ss-joystick h1"></p>
                <p className="h5">No games played</p>
            </div>
        );
    } else {
        gamesHtml = games.map((game) => {
            return (
                <GamePlayed
                    game={game}
                    userId={user.id} />
            )
        });
        wins = user.wins;
        losses = user.losses;
    }
    return (
        <div className="col col-12">
            <div className="col col-12">
                <p className="h3 mb0">Contest History</p>
                <p className="h5 gray">{wins} - {losses}</p>
            </div>
            <div className="col col-12 white-bg">
                {gamesHtml}
            </div>
        </div>
    );
}