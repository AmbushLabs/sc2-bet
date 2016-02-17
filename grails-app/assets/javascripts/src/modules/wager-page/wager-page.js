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

import ShareModal from './../share-modal/share';

import BattleNetTag from './battle-net-tag';

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
        this.getShareModal = this.getShareModal.bind(this);
        this.getBattleNetTag = this.getBattleNetTag.bind(this);
        this.getLoggedOutStatusDisplay = this.getLoggedOutStatusDisplay.bind(this);
    }

    componentDidMount() {
        if (this.props.router.params.id) {
            this.props.dispatch(getGame(this.props.router.params.id, this.props.csrf.value));
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
        const { dispatch, gameReplay, config } = this.props;

        return (
            <div className="col col-12 mb4 clearfix">
                <div className="col col-12 center mt3 mb2">
                    <div className="h1 gosu-blue-text">Winner Takes <span className="gosu-coins-gold"><span className="ss-icon ss-coins h2"></span>&nbsp;{game.wager}</span></div>
                    <div className="h4 gray">Current Status: {this.getStatusDisplay(game)}</div>
                </div>
                {this.getBattleNetTag(game)}
                <div className="col col-12">
                    <div className="col col-0 lg-col-2">
                        &nbsp;
                    </div>
                    <div className="col col-12 lg-col-4">
                        <div className="px1">
                            <GameCardUser
                                user={game.player1}
                                game={game} />
                        </div>
                    </div>
                    <div className="col col-12 lg-col-4">
                        <div className="px1">
                            <GameCardUser
                                user={game.player2}
                                game={game} />
                        </div>
                    </div>
                    <div className="col col-0 lg-col-2">
                        &nbsp;
                    </div>
                </div>
                <div className="col col-12">
                    <div className="col col-0 lg-col-2">
                        &nbsp;
                    </div>
                    <div className="col col-12 lg-col-8 px1">
                        <GameActions
                            game={game}
                            dispatch={this.props.dispatch}
                            loggedIn={this.props.loggedIn}
                            wagerPage={true}
                            csrf={this.props.csrf}
                            />
                    </div>
                    <div className="col col-0 lg-col-2  ">
                        &nbsp;
                    </div>
                </div>

                {this.renderDropZone(game, this.props.dispatch, gameReplay, config, this.props.csrf)}
                {this.getShareModal(game, this.props.dispatch, this.props.csrf)}
            </div>
        );
    }

    getBattleNetTag(game) {
        if (game.has_player1 && game.has_player2 && game.has_player1_accepted && (game.is_player1 || game.is_player2)) {
            const battleNetTag = (game.is_player1) ? game.player2.battle_tag : game.player1.battle_tag;
            return (
                <BattleNetTag
                    battleNetTag={battleNetTag}
                    />
            );
        } else {
            return '';
        }
    }

    renderDropZone(game, dispatch, gameReplay, config, csrf) {
        if (game.has_player1 && game.has_player2 && game.has_player1_accepted && (game.is_player1 || game.is_player2)) {
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
                        config={config}
                        csrf={this.props.csrf}
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

    getShareModal(game, dispatch, csrf) {
        if (game && game.show_share_modal) {
            return (
                <ShareModal
                    game={game}
                    dispatch={dispatch}
                    csrf={csrf}
                    />
            );
        }
        return;
    }

    getStatusDisplay(game) {
        if (!game) {
            return '';
        }
        if (!game.is_player1 && !game.is_player2) {
            return this.getLoggedOutStatusDisplay(game);
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

    getLoggedOutStatusDisplay(game) {
        if (game.completed) {
            return 'Completed!';
        } else if (game.has_player1 && game.has_player2 && game.has_player1_accepted) {
            return 'Ready to play!';
        } else if (game.has_player1 && game.has_player2) {
            return 'Waiting for challenger to be accepted.';
        } else if (game.has_player1) {
            return 'Waiting for a challenger. Signup or login to join this game.';
        } else {
            return 'Waiting for someone to join. Signup or login to join this game.';
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
            case 'replay_exists':
                return ' because that replay was already uploaded to another game or by another player.';
            default:
                return '';
        }
    }

};


const getGame = (game_id, csrf) => {
    return (dispatch) => {
        fetch('/game/g/' + game_id + '?csrf=' + csrf, {
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