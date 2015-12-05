import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    FETCH_SINGLE_GAME
} from './../../actions/actions';

import FullUser from './../user/full-user';
import WagerAmount from './wager-amount';
import NoChallenger from './no-challenger';

import GameCardUser from './../user/game-card-user';
import GameActions from './../games/game-actions2';

import ReplayDropzone from './../replay-uploader/replay-drop-zone';

@connect(state => (state))
class WagerPage extends Component {

    constructor(options) {
        super(options);
        this.renderUser = this.renderUser.bind(this);
        this.getStatusDisplay = this.getStatusDisplay.bind(this);
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
        const { dispatch } = this.props;
        /*
        const gameHtml = (
            <div className="col col-12">
                <ReplayDropzone
                    s3={this.props.s3}
                    game={game}
                    />
            </div>
        ); */

        return (
            <div>
                <div className="col col-12 center mt3 mb2">
                    <div className="h1 gosu-blue-text">Contest: {game.wager} Gosu Coins</div>
                    <div className="h4 gray">Current Status: {this.getStatusDisplay(game)}</div>
                </div>
                <div className="col col-12">
                    <div className="col col-2">
                        &nbsp;
                    </div>
                    <div className="col col-4">
                        <div className="px1">
                            <GameCardUser user={game.player1} />
                        </div>
                    </div>
                    <div className="col col-4">
                        <div className="px1">
                            <GameCardUser user={game.player2} />
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
            </div>
        );
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
        if (game.has_player1 && game.has_player2 && game.has_player1_accepted) {
            return 'Ready to play!';
        } else if (game.has_player1 && game.has_player2) {
            return 'Waiting for challenger to be accepted.';
        } else if (game.has_player1) {
            return 'Waiting for a challenger';
        } else {
            return 'Waiting for someone to join';
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