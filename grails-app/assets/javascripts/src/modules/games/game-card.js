import React, { Component, PropTypes } from 'react';

import GameCardUser from './../user/game-card-user';
import GameActions from './game-actions2';
import ShareModal from './../share-modal/share';


export default class GameCard extends Component {

    constructor(options) {
        super(options);
        this.getChallenger = this.getChallenger.bind(this);
        this.getHasJoinedStar = this.getHasJoinedStar.bind(this);
        this.getShareModal = this.getShareModal.bind(this);
    }

    getChallenger() {
        const { game } = this.props;
        if (game) {
            if (game.has_player1 && !game.is_player1) {
                return (
                    <GameCardUser
                        hasAnyPlayers={true}
                        user={game.player1}
                        />
                );
            } else if (game.has_player2 && !game.is_player2) {
                return (
                    <GameCardUser
                        hasAnyPlayers={true}
                        user={game.player2} />
                );
            }
        }
        return (
           <GameCardUser
               game={game}
               hasAnyPlayers={game.has_player1 || game.has_player2}
               />
        );
    }

    getShareModal() {
        const { game, dispatch } = this.props;
        if (game.show_share_modal) {
            return (
                <ShareModal
                    game={game}
                    dispatch={dispatch}
                    />
            );
        }
        return;
    }

    getHasJoinedStar() {
        if (this.props.game.is_joined) {
            return (<span>&nbsp;</span>);
        }
        return (<span>&nbsp;</span>);
    }

    render() {

        const innerClass = (this.props.innerClass != null && this.props.innerClass != '') ? this.props.innerClass : "m1 p1 clearfix black border bg-white";

        return (
            <div className={"animated fadeIn col " + this.props.colSize}>
                <div className={innerClass}>
                    <div className="col col-8">
                        <p className="h3">
                            <a className="gosu-coins-gold" href={"/w/" + this.props.game.id}><span className="ss-icon ss-coins h5"></span>&nbsp;{this.props.game.wager}&nbsp;</a>
                        </p>
                    </div>
                    <div className="col col-4 right-align">
                        {this.getHasJoinedStar()}
                        <a href={"/w/" + this.props.game.id}><span className="ss-icon ss-redirect gosu-blue right h4"></span></a>
                    </div>
                    <div className="">
                        <div className="col col-12 left-align">
                            <div className="">
                                {this.getChallenger()}
                            </div>
                        </div>
                        <div className="col col-12">
                            <GameActions
                                game={this.props.game}
                                dispatch={this.props.dispatch}
                                loggedIn={this.props.loggedIn}
                                csrf={this.props.csrf}
                                />

                        </div>
                    </div>
                </div>
                {this.getShareModal()}
            </div>
        );
    }
};