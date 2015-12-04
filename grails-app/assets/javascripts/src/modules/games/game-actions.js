import React, { Component, PropTypes } from 'react';

import ActionButton from './action-button';
import Join from './action-buttons/join';
import { accept, cancel, join, reject } from './../../api/game/crud';


export default class GameActions extends Component {

    constructor(options) {
        super(options);
        this.getDisabledButton = this.getDisabledButton.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.acceptChallenger = this.acceptChallenger.bind(this);
        this.rejectChallenger = this.rejectChallenger.bind(this);
    }

    render() {
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

    getDisabledButton(text) {
        return (
            <ActionButton
                className="btn btn-primary mb1 mt1 col col-12 bg-blue is-disabled"
                is_disabled={true}
                buttonText={text} />
        );
    }

}