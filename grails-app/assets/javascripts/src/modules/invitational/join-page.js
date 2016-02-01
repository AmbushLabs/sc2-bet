import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import signupWindow from './../user/signup-window';
import joinTournament from './../../api/user/joinTournament';


@connect(state => (state))
class Invitational extends Component {

    constructor(options) {
        super(options);
        this.performJoinAction = this.performJoinAction.bind(this);
        this.getJoinButton = this.getJoinButton.bind(this);
    }

    render() {

        return (
            <section className="bg-darken-1 p2 clearfix">
                <section className="col col-12">
                    <section className="col col-12">
                        <p className="h3 ml2 mt1">Join the first ever GosuEmpire Invitational</p>
                    </section>
                    <section className="col col-12 mb3">
                        <div className="clearfix">
                            {this.getJoinButton()}
                        </div>
                    </section>
                </section>
            </section>
        );
    }

    performJoinAction() {
        const { loggedIn, dispatch } = this.props;
        if (!loggedIn) {
            signupWindow(dispatch);
        } else {
            dispatch(joinTournament());
        }
    }

    getJoinButton() {
        const { invitational } = this.props;
        if (invitational && invitational.joined) {
            return (<div>Joined!</div>);
        }
        return (
            <button className="btn btn-outline" onClick={() => this.performJoinAction()}>
                Join the Invitational!
            </button>
        );
    }

};

export default Invitational;