import React from 'react';

const GameCardUser = ({ user, game, hasAnyPlayers }) => {
    console.log(game, user, hasAnyPlayers);
    var bgColor = 'gosu-blue-bg';
    var challenger = 'CHALLENGER';
    var gcuAvatar = '';
    var displayNameJsx = '';
    if (_.isUndefined(user) || _.isNull(user)) {
        user = {
            display_name: '...',
            primary_race: '...',
            highest_1v1_rank: '...',
        }
        challenger = 'NO CHALLENGER';

        gcuAvatar = (
            <div className="circle gcu-avatar center bg-white">
                <div className="ss-icons ss-crown h1 mt2"></div>
            </div>
        );
        if (hasAnyPlayers) {
            displayNameJsx = (<div className="h6 white">Waiting on challenger</div>);
        } else {
            displayNameJsx = (<div className="h6 white">Join to play!</div>);
        }
    } else {
        displayNameJsx = (<div className="h4 white"><a href={"/p/" + user.user_id}>{user.display_name}</a></div>);
        if (!user.avatar_url || user.avatar_url == '' || user.avatar_url.indexOf('http') < 0) {
            gcuAvatar = (<div className="circle gcu-avatar center bg-white"><div className="ss-icons ss-user h1 mt2"></div></div>);
        } else {
            gcuAvatar = (<img className="circle gcu-avatar" src={user.avatar_url} />);
        }
    }

    var isWinner = (<div className="col col-2">&nbsp;</div>);
    var winnerOuterClass = "";
    var winnerTextClass = "";
    if (user && user.winner) {
        challenger = 'WINNER';
        winnerOuterClass = "winner-border";
        winnerTextClass = "winner-text";
        isWinner = (
            <div className="col col-2 center mt1">
                <span className="ss-icons ss-trophy h2 winner-text"></span>
            </div>
        );
    }



    return (
        <div className={"col col-12 border mb1 game-card-user " + winnerOuterClass}>
            {gcuAvatar}
            <div className={"col col-12 p1 " + bgColor}>
                <div className="gcu-right-container">
                    <div className="col col-10">
                        <div className={"h6 silver " + winnerTextClass}>{challenger}</div>
                        {displayNameJsx}
                    </div>
                    {isWinner}
                </div>
            </div>
            <div className="col col-12 gosu-light-blue-bg">
                <div className="gcu-right-container">
                    <div className="col col-6 p1">
                        <div className="h6 gray">RACE</div>
                        <div className="h6">{user.primary_race}</div>
                    </div>
                    <div className="col col-6 p1">
                        <div className="h6 gray">RANK</div>
                        <div className="h6">{user.highest_1v1_rank}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCardUser;