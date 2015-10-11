import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {
    JOIN_GAME,
    CANCEL_GAME,
    ACCEPT_CHALLENGER,
    REJECT_CHALLENGER
} from './../../actions/actions';

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
        const buttonStates = {
            is_joining: this.props.game.is_joining,
            is_cancelling: this.props.game.is_cancelling,
            is_rejecting: this.props.game.is_rejecting,
            is_accepting: this.props.game.is_accepting,
            is_fetching: this.props.is_fetching
        };
        if (this.props.game.is_creator) {
            if (this.props.game.has_challenger) {
                if (this.props.game.has_creator_accepted) {
                    return this.getDisabledButton('Play time!')
                } else {
                    return (
                        <div>
                            <div className="col col-4">
                                <ActionButton
                                    {...buttonStates}
                                    className="btn btn-primary mb1 mt1 bg-red mr1 col-11"
                                    onClick={this.cancelGame}
                                    buttonType="Cancel"
                                    />
                            </div>
                            <div className="col col-4">
                                <ActionButton
                                    {...buttonStates}
                                    className="btn btn-primary mb1 mt1 bg-maroon mr1 col-11"
                                    onClick={this.rejectChallenger}
                                    buttonType="Reject"
                                    />
                            </div>
                            <div className="col col-4">
                                <ActionButton
                                    {...buttonStates}
                                    className="btn btn-primary mb1 mt1 bg-blue ml1 col-11"
                                    onClick={this.acceptChallenger}
                                    buttonType="Accept"
                                    />
                            </div>
                        </div>
                    );
                }
            } else {
                return (
                    <ActionButton
                        {...buttonStates}
                        className="btn btn-primary mb1 mt1 bg-red col-12"
                        onClick={this.cancelGame}
                        buttonType="Cancel"
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
                        {...buttonStates}
                        className="btn btn-primary mb1 mt1 bg-blue col col-12"
                        onClick={this.joinGame}
                        buttonType="Join"
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
                disabled_text={text} />
        );
    }



    joinGame() {
        console.log('join');
        if (this.props.is_fetching) {
            console.log('is fetching');
            return;
        }
        console.log('isnt fetching');
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

const accept = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: ACCEPT_CHALLENGER,
            is_fetching: true
        });
        return fetch('/game/' + game_id + '/accept', {
            method:'post',
            credentials:'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type: ACCEPT_CHALLENGER,
                is_fetching: false,
                status: 'success',
                data: json
            })
        );
    };
};

const reject = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: REJECT_CHALLENGER,
            is_fetching: true
        });
        return fetch('/game/' + game_id + '/reject', {
            method:'post',
            credentials:'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type: REJECT_CHALLENGER,
                is_fetching: false,
                status: 'success',
                data: json
            })
        );
    }
};

const cancel = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: CANCEL_GAME,
            is_fetching: true
        });
        return fetch('/game/g/' + game_id, {
            method:'delete',
            credentials:'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type: CANCEL_GAME,
                is_fetching: false,
                status: 'success',
                data: json
            })
        );
    };
};

const join = (game_id) => {
    return (dispatch) => {
        dispatch({
            type: JOIN_GAME,
            is_fetching: true
        });
        return fetch('/game/' + game_id + '/join', {
            method:'post',
            credentials:'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type: CANCEL_GAME,
                is_fetching: false,
                status: 'success',
                data: json
            })
        );
    };
};