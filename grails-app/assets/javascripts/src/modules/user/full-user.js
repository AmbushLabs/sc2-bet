import React, { Component } from 'react';

import UserImage from './user-image';

export default class BasicUser extends Component {

    render() {
        console.log(this.props);
        const { user } = this.props;
        if (_.isUndefined(user) || _.isNull(user)) {
            return (
                <div>&nbsp;</div>
            );
        }
        return (
            <div className="col col-4 border m2 clearfix">
                <div className="col-12 center mt3">
                    <UserImage img_src={user.avatar_url} />
                </div>
                <div className="col-12 center h3 mt1 mb3">
                    {user.display_name}<br />
                </div>
                <div className="col-12">
                    <div className="col col-4 center bg-silver border-right black p1">
                        <div className="h4">{user.primary_race}</div>
                        <div className="h6 gray">PRIMARY RACE</div>
                    </div>
                    <div className="col col-4 center bg-silver border-right black p1">
                        <div className="h4">{user.primary_race_wins}</div>
                        <div className="h6 gray">WINS</div>
                    </div>
                    <div className="col col-4 center bg-silver black p1">
                        <div className="h4">{user.highest_1v1_rank}</div>
                        <div className="h6 gray">HIGHEST RANK</div>
                    </div>
                </div>
            </div>
        )
    }

}