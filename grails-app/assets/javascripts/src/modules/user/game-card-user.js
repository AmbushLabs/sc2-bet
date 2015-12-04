import React from 'react';

const GameCardUser = ({ user }) => {
    var bgColor = 'gosu-blue-bg';
    var challenger = 'CHALLENGER';
    if (_.isUndefined(user) || _.isNull(user)) {

        user = {
            display_name: '...',
            primary_race: '...',
            highest_1v1_rank: '...',
        }
        bgColor = 'bg-gray';
        challenger = 'NO CHALLENGER';
    }
    return (
        <div className="col col-12 border mb1">
            <div className={"col col-12 p1 " + bgColor}>
                <div className="h6 silver">{challenger}</div>
                <div className="h4 white">{user.display_name}</div>
            </div>
            <div className="col col-6 p1">
                <div className="h6">RACE</div>
                <div className="h4">{user.primary_race}</div>
            </div>
            <div className="col col-6 p1">
                <div className="h6">HIGHEST RANK</div>
                <div className="h4">{user.highest_1v1_rank}</div>
            </div>
        </div>
    )
};

export default GameCardUser;