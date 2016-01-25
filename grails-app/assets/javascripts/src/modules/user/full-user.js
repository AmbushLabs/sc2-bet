import React from 'react';

//stupid this user is really a character :(
export default ({ user, userId, dashboard, referral }) => {
    if (_.isNull(dashboard) || _.isUndefined(dashboard)) {
        dashboard = false;
    }
    var bgColor = 'gosu-blue-bg';
    var gcuAvatar = '';
    if (!user || !user.avatar_url || user.avatar_url == '' || user.avatar_url.indexOf('http') < 0) {
        gcuAvatar = (<div className="circle gcu-avatar center bg-white"><div className="ss-icons ss-user h1 mt2"></div></div>);
    } else {
        gcuAvatar = (<img className="circle gcu-avatar" src={user.avatar_url} />);
    }

    var seasonWins = user.protoss_wins + user.terran_wins + user.zerg_wins;
    var seasonLosses = user.season_total_games - seasonWins;
    var rankText = 'TOP RANK';
    var rankInfo = user.highest_1v1_rank;

    if (user.current_1v1_losses) {
        seasonWins = user.current_1v1_wins;
        seasonLosses = user.current_1v1_losses;
        rankText = 'CURRENT SEASON RANK';
        rankInfo = user.current_1v1_rank;
    }

    var referralSection = (<span></span>);
    if (dashboard) {
        referralSection = (
            <div className="col col-12">
                <div className="col col-12 sm-col-6 p1">
                    <div className="h4 gray">REFERRAL CODE</div>
                    <div className="h4">{referral}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="col col-12 border mb1 game-card-user game-card-full-user gosu-light-blue-bg">
            {gcuAvatar}
            <div className={"col col-12 p1 " + bgColor}>
                <div className="gcu-right-container">
                    <div className="h6 silver">YOUR ACCOUNT</div>
                    <div className="h4 white"><a href={"/p/" + userId}>{user.display_name}</a></div>
                </div>
            </div>
            <div className="col col-12 gosu-light-blue-bg">
                <div className="gcu-right-container">
                    <div className="col col-12">
                        <div className="col col-12 sm-col-6 p1">
                            <div className="h4 gray">PRIMARY RACE</div>
                            <div className="h4">{user.primary_race}</div>
                        </div>
                        <div className="col col-12 sm-col-6 p1">
                            <div className="h4 gray">{rankText}</div>
                            <div className="h4">{rankInfo}</div>
                        </div>
                    </div>
                    <div className="col col-12">
                        <div className="col col-12 sm-col-6 p1">
                            <div className="h4 gray">SEASON RECORD</div>
                            <div className="h4">{seasonWins} - {seasonLosses}</div>
                        </div>
                        <div className="col col-12 sm-col-6 p1">
                            <div className="h4 gray">CAREER GAMES PLAYED</div>
                            <div className="h4">{user.career_total_games}</div>
                        </div>
                    </div>
                    {referralSection}
                    <div className="col col-12">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    )
};