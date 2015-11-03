import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    FETCH_SINGLE_GAME
} from './../../actions/actions';

import FullUser from './../user/full-user';
import WagerAmount from './wager-amount';
import NoChallenger from './no-challenger';
import GameActions from './../games/game-actions'

import ReplayDropzone from './../replay-uploader/replay-drop-zone';

@connect(state => (state))
class WagerPage extends Component {

    constructor(options) {
        super(options);
        this.renderUser = this.renderUser.bind(this);
        this.renderOwnerControlsIfOwner = this.renderOwnerControlsIfOwner.bind(this);
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
        return (
            <div>
                <div className="col col-12">
                {this.renderUser(game.creator, 'creator')}
                <WagerAmount wager={game.wager} />
                {this.renderUser(game.challenger, 'challenger')}
                </div>
                <div className="col col-12">
                    {this.renderOwnerControlsIfOwner()}
                </div>
                <div className="col col-12">
                    <ReplayDropzone
                        s3={this.props.s3}
                        game={game}
                        />
                </div>
            </div>
        )
    }

    renderUser(user, type) {
        if (!user) {
            if (type == 'challenger') {
                const game = this.props.games.all[this.props.router.params.id];
                return (
                    <NoChallenger
                        game={game}
                        dispatch={this.props.dispatch}
                        />
                );
            }
        }
        return (
            <FullUser user={user} />
        );
    }

    renderOwnerControlsIfOwner() {
        const game = this.props.games.all[this.props.router.params.id];
        if (!game.is_creator) {
            return;
        }
        return (
            <div className="col col-4 m2">
                <h3>Your Game Controls</h3>
                <GameActions
                    game={game}
                    is_cancelling={game.is_cancelling}
                    is_rejecting={game.is_rejecting}
                    is_accepting={game.is_accepting}
                    is_joining={game.is_joining}
                    dispatch={this.props.dispatch} />
            </div>
        );
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