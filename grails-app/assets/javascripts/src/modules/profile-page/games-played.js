import React from 'react';
import GamePlayed from './game-played';

export default ({ games }) => {
    if (!games || games.length == 0) {
        return (
            <div className="col col-12">
                <div className="col col-12 gosu-blue-bg">
                    <p className="h3 white p2">Games</p>
                </div>
                <div className="col col-12 white-bg p2">
                    <p className="ss-icons ss-joystick h1"></p>
                    <p className="h5">No games played</p>
                </div>
            </div>
        );
    }
    return (
        <div className="col col-12">
            <div className="col col-12 gosu-blue-bg">
                <p className="h3 white p2">Games</p>
            </div>
            <div className="col col-12 gosu-light-blue-bg p2 center">
                <p className="ss-icons ss-joystick h1"></p>
                <p className="h5">No games played</p>
            </div>
        </div>
    );
}