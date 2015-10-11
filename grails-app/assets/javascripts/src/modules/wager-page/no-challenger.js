import React, { Component } from 'react';

import UserImage from './../user/user-image';

export default class BasicUser extends Component {

    render() {
        return (
            <div className="col col-4 border m2 clearfix">
                <div className="col-12 center h3 mt3">
                    Think you can win?
                </div>
                <div className="col-12 center h3 mt1 mb3">
                    See how Gosu you are. Challenge and find out.
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