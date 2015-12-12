import React from 'react';

const GameCardUser = ({ user }) => {
    var bgColor = 'gosu-blue-bg';
    var challenger = 'CHALLENGER';
    var gcuAvatar = '';
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
    } else {
        if (!user.avatar_url || user.avatar_url == '' || user.avatar_url.indexOf('http') < 0) {
            gcuAvatar = (<div className="circle gcu-avatar center bg-white"><div className="ss-icons ss-user h1 mt2"></div></div>);
        } else {
            gcuAvatar = (<img className="circle gcu-avatar" src={user.avatar_url} />);
        }
    }
    return (
        <div className="col col-12 border mb1 game-card-user">
            {gcuAvatar}
            <div className={"col col-12 p1 " + bgColor}>
                <div className="gcu-right-container">
                    <div className="h6 silver">{challenger}</div>
                    <div className="h4 white"><a href={"/p/" + user.user_id}>{user.display_name}</a></div>
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
    )
};

export default GameCardUser;