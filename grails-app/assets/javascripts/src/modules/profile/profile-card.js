/**
 * Created by joseph on 10/3/15.
 */
import React from 'react';
import ReactIntl from 'react-intl';

var ProfileCard = React.createClass({
    getInitialState: function() {
      return {
          isLoading: false
      }
    },
    render: function() {
        return (
            <section>
                {this.getUserProfile(this.props.user)}
            </section>
        );
    },
    getUserProfile: function (user) {
        if (_.isUndefined(user) || _.isNull(user)) {
            return;
        }
        return (
            <div className="loader">&nbsp;</div>
        );
    }
});

export default ProfileCard;

