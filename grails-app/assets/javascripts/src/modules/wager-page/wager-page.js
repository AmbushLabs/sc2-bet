import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    FETCH_SINGLE_GAME
} from './../../actions/actions';

import FullUser from './../user/full-user';
import WagerAmount from './wager-amount';
import NoChallenger from './no-challenger';
import ReplayInfo from './replay-info';

import GameCardUser from './../user/game-card-user';
import GameActions from './../games/game-actions2';

import ReplayDropzone from './../replay-uploader/replay-drop-zone';
import replayStatus from './../../api/game/replayStatus';

@connect(state => (state))
class WagerPage extends Component {

    constructor(options) {
        super(options);
        this.renderUser = this.renderUser.bind(this);
        this.getStatusDisplay = this.getStatusDisplay.bind(this);
        this.renderDropZone = this.renderDropZone.bind(this);
        this.getReplayErrorReasonDisplay = this.getReplayErrorReasonDisplay.bind(this);
    }

    componentDidMount() {
        if (this.props.router.params.id) {
            this.props.dispatch(getGame(this.props.router.params.id));
        }
    }

    render() {
        if (!this.props.games.all) {
            return (<div></div>);
        }
        const game = this.props.games.all[this.props.router.params.id];
        if (!game) {
            return (<div></div>);
        }
        const { dispatch, gameReplay } = this.props;

        return (
            <div className="col col-12 mb4 clearfix">
                <div className="col col-12 center mt3 mb2">
                    <div className="h1 gosu-blue-text">Winner Takes <span className="gosu-coins-gold"><span className="ss-icon ss-coins h2"></span>&nbsp;{game.wager}</span></div>
                    <div className="h4 gray">Current Status: {this.getStatusDisplay(game)}</div>
                </div>
                <div className="col col-12">
                    <div className="col col-2">
                        &nbsp;
                    </div>
                    <div className="col col-4">
                        <div className="px1">
                            <GameCardUser
                                user={game.player1}
                                game={game} />
                        </div>
                    </div>
                    <div className="col col-4">
                        <div className="px1">
                            <GameCardUser
                                user={game.player2}
                                game={game} />
                        </div>
                    </div>
                    <div className="col col-2">
                        &nbsp;
                    </div>
                </div>
                <div className="col col-12">
                    <div className="col col-2">
                        &nbsp;
                    </div>
                    <div className="col col-8">
                        <GameActions
                            game={game}
                            dispatch={this.props.dispatch} />
                    </div>
                    <div className="col col-2">
                        &nbsp;
                    </div>
                </div>

                {this.renderDropZone(game, this.props.dispatch, gameReplay)}
            </div>
        );
    }

    renderDropZone(game, dispatch, gameReplay) {
        if (game.has_player1 && game.has_player2 && game.has_player1_accepted) {
            var dropZone = null;
            var errorState = null;
            if (gameReplay && gameReplay.uploading) {
                dropZone = (
                    <div className="center p3 replay-drop-zone">
                        <div className="animated pulse infinite">
                            <p className="h1 ss-icons ss-transfer bold"></p>
                            <p className="h3">Your replay is uploading...</p>
                        </div>
                    </div>
                );
            } else if (gameReplay && gameReplay.uploaded && !gameReplay.processed) {
                dropZone = (
                    <div className="center p3 replay-drop-zone">
                        <div className="">
                            <p className="h1 ss-icons ss-check bold"></p>

                            <p className="h3">
                                Your replay has uploading successfully!
                                It might take a few moments for us to process
                                the replay to determine the winner.
                            </p>
                        </div>
                    </div>
                );
                setTimeout(() => dispatch(replayStatus(game.id)), 10000);
            } else if (gameReplay && gameReplay.uploaded && gameReplay.processed && gameReplay.valid) {
                dropZone = (
                    <ReplayInfo
                        game={game}
                        replay={gameReplay}
                        />
                );
            } else {
                if (gameReplay && gameReplay.uploaded && gameReplay.error_reason) {
                    errorState = (
                        <div className="mt3 p2 center is_error clearfix">
                            <div className="col col-2 center">
                                <div className="h1 mt3"><span className="ss-icons ss-alert"></span></div>
                            </div>
                            <div className="col col-8">
                                <p className="h4">Oops! Did you upload the right replay?</p>
                                <p className="h6">
                                    The last replay uploaded was not valid for this contest{this.getReplayErrorReasonDisplay(gameReplay.error_reason)}. Please try again.
                                </p>
                            </div>
                            <div className="col col-2">
                                &nbsp;
                            </div>

                        </div>
                    );
                }
                dropZone = (
                    <ReplayDropzone
                        s3={this.props.s3}
                        game={game}
                        dispatch={dispatch}
                        />
                );
            }
            return (
                <div className="col col-12">
                    <div className="col col-2">
                        &nbsp;
                    </div>
                    <div className="col col-8">
                        {errorState}
                        <div className="col col-12 mt3 gosu-light-blue-bg gosu-blue-text">
                            {dropZone}
                        </div>
                    </div>
                    <div className="col col-2">
                        &nbsp;
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    renderUser(user, type) {
        return (
            <GameCardUser user={user} />
        );
    }

    getStatusDisplay(game) {
        if (!game) {
            return '';
        }
        if (game.completed) {
            return 'Completed!';
        } else if (game.has_player1 && game.has_player2 && game.has_player1_accepted) {
            return 'Ready to play! Upload the replay when you are done.';
        } else if (game.has_player1 && game.has_player2) {
            return 'Waiting for challenger to be accepted.';
        } else if (game.has_player1) {
            return 'Waiting for a challenger';
        } else {
            return 'Waiting for someone to join';
        }
    }

    getReplayErrorReasonDisplay(reason) {
        if (!reason) {
            return '';
        }
        switch(reason) {
            case 'start_time_before_accepted':
                return ' because the replay started before the GosuEmpire contest was ready';
            case 'invalid_players':
                return ' because the players from the replay don\'t appear to match';
            default:
                return '';
        }
    }

};


const getGame = (game_id) => {
    return (dispatch) => {
        fetch('/game/g/' + game_id, {
            method:'get',
            credentials:'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type:FETCH_SINGLE_GAME,
                status:'success',
                data: json
            })
        );
    };
}

export default WagerPage;