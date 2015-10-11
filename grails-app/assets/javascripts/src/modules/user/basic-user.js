import React, { Component } from 'react';

export default class BasicUser extends Component {

    render() {
        const { outerClass, user } = this.props;
        if (_.isUndefined(user) || _.isNull(user)) {
            return (
                <div>&nbsp;</div>
            );
        }
        return (
            <div className={outerClass}>
                {user.display_name}<br />
                {user.primary_race}<br />
                {user.highest_1v1_rank}
            </div>
        )
    }

}