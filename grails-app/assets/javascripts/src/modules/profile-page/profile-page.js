import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    FETCH_PROFILE
} from './../../actions/actions';

import FullUser from './../user/full-user';

@connect(state => (state))
class ProfilePage extends Component {

    constructor(options) {
        super(options);
    }

    componentDidMount() {
        if (this.props.router.params.id) {
            this.props.dispatch(getProfile(this.props.router.params.id));
        }
    }

    render() {
        const { profile } = this.props;
        if (!profile || !profile.character) {
            return (<div></div>);
        }

        return (
            <div className="col col-12 mt3">
                <div className="col col-2">&nbsp;</div>
                <div className="col col-8">
                    <FullUser
                        user={profile.character} />
                </div>
                <div className="col col-2">&nbsp;</div>
            </div>
        );
    }

};


const getProfile = (user_id) => {
    return (dispatch) => {
        fetch('/user/profile/' + user_id, {
            method:'get',
            credentials:'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type:FETCH_PROFILE,
                status:'success',
                data: json
            })
        );
    };
}

export default ProfilePage;