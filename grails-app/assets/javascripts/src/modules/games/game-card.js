import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { accept, cancel, join, reject } from './../../api/game/crud';

import BasicUser from './../user/basic-user';
import ActionButton from './action-button';


export default class GameCard extends Component {

    constructor(options) {
        super(options);
        this.getControls = this.getControls.bind(this);
        this.getDisabledButton = this.getDisabledButton.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.acceptChallenger = this.acceptChallenger.bind(this);
        this.rejectChallenger = this.rejectChallenger.bind(this);
    }

    render() {
        return (
            <div className={"col " + this.props.colSize}>
                <div className="m1 p1 clearfix bg-black white">
                    <div className="bg-lighten-3">
                        <div className="col col-4 left-align">
                            <h6>Creator</h6>
                            <BasicUser
                                user={this.props.game.creator}
                                outerClass="h4 mt1" />
                        </div>
                        <div className="col col-4 center">
                            <a className="h6" href={"/w/" + this.props.game.id}>
                                Wager
                            </a>
                            <h1 className="mt1">
                                {this.props.game.wager}&nbsp;
                                <span className="ss-icon ss-coins h2"></span>
                            </h1>
                        </div>
                        <div className="col col-4 right-align">
                            <h6>Challenger</h6>
                            <BasicUser
                                user={this.props.game.challenger}
                                outerClass="h4 mt1" />
                        </div>
                        <div className="col col-12">
                            {this.getControls()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getControls() {
        if (!this.props.game.is_active) {
            return this.getDisabledButton('Wager cancelled');
        }
        if (this.props.game.is_creator) {
            if (this.props.game.has_challenger) {
                if (this.props.game.has_creator_accepted) {
                    return this.getDisabledButton('Play time!')
                } else {
                    return (
                        <div>
                            <div className="col col-4">
                                <ActionButton
                                    is_fetching={this.props.is_cancelling}
                                    className="btn btn-primary mb1 mt1 bg-red mr1 col-11"
                                    onClick={this.cancelGame}
                                    buttonText="Cancel"
                                    />
                            </div>
                            <div className="col col-4">
                                <ActionButton
                                    is_fetching={this.props.is_rejecting}
                                    className="btn btn-primary mb1 mt1 bg-maroon mr1 col-11"
                                    onClick={this.rejectChallenger}
                                    buttonText="Reject"
                                    />
                            </div>
                            <div className="col col-4">
                                <ActionButton
                                    is_fetching={this.props.is_accepting}
                                    className="btn btn-primary mb1 mt1 bg-blue ml1 col-11"
                                    onClick={this.acceptChallenger}
                                    buttonText="Accept"
                                    />
                            </div>
                        </div>
                    );
                }
            } else {
                return (
                    <ActionButton
                        is_fetching={this.props.is_cancelling}
                        className="btn btn-primary mb1 mt1 bg-red col-12"
                        onClick={this.cancelGame}
                        buttonText="Cancel"
                        />
                );
            }
        } else {
            if (this.props.game.is_challenger) {
                if (this.props.game.has_creator_accepted) {
                    //ok this game is a go for you
                    return this.getDisabledButton('Play Time!')
                } else {
                    //waiting on them to say cool
                    return this.getDisabledButton('Waiting to Accept');
                }
            } else if (this.props.game.has_challenger) {
                //already has a challenger
                return this.getDisabledButton('Already matched');
            } else {
                //there is no challenger, show join
                return (
                    <ActionButton
                        is_fetching={this.props.is_joining}
                        className="btn btn-primary mb1 mt1 bg-blue col col-12"
                        onClick={this.joinGame}
                        buttonText="Join"
                        />
                );
            }
        }
    }

    getDisabledButton(text) {
        return (
            <ActionButton
                className="btn btn-primary mb1 mt1 col col-12 bg-blue is-disabled"
                is_disabled={true}
                buttonText={text} />
        );
    }

    joinGame() {
        if (this.props.is_fetching) {
            return;
        }
        this.props.dispatch(join(this.props.game.id));
    }

    cancelGame() {
        if (this.props.is_fetching) {
            return;
        }
        this.props.dispatch(cancel(this.props.game.id));
    }

    acceptChallenger() {
        if (this.props.is_fetching) {
            return;
        }
        this.props.dispatch(accept(this.props.game.id));
    }

    rejectChallenger() {
        if (this.props.is_fetching) {
            return;
        }
        this.props.dispatch(reject(this.props.game.id));

    }
};