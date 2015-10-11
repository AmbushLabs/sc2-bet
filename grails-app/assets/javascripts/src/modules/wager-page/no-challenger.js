import React, { Component } from 'react';

import { join } from './../../api/game/crud';

import UserImage from './../user/user-image';
import ActionButton from './../games/action-button'

export default class NoChallenger extends Component {

    constructor(options) {
        super(options);
        this.joinGame = this.joinGame.bind(this);
    }

    render() {
        return (
            <div className="col col-4 border m2 clearfix">
                <div className="col-12 center h3 mt3">
                    Think you can win?
                </div>
                <div className="col-12 center h3 mt1 mb3">
                    See how Gosu you are. Challenge and find out.
                </div>
                <div className="col-12">
                    <ActionButton
                        is_fetching={this.props.is_joining}
                        className="btn btn-primary mb1 mt1 bg-blue col col-12"
                        onClick={this.joinGame}
                        buttonText="Join"
                        />
                </div>
            </div>
        )
    }

    joinGame() {
        if (this.props.is_fetching) {
            return;
        }
        this.props.dispatch(join(this.props.game_id));
    }

}