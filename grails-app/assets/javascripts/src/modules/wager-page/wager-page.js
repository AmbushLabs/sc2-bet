import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    FETCH_SINGLE_GAME
} from './../../actions/actions';

import FullUser from './../user/full-user';
import WagerAmount from './wager-amount';
import NoChallenger from './no-challenger';

@connect(state => (state))
class WagerPage extends Component {

    constructor(options) {
        super(options);
        this.renderUser = this.renderUser.bind(this);
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
                {this.renderUser(game.creator, 'creator')}
                <WagerAmount wager={game.wager} />
                {this.renderUser(game.challenger, 'challenger')}
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