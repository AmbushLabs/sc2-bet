import React, { Component } from 'react';

import { join } from './../../api/game/crud';

import UserImage from './../user/user-image';
import GameActions from './../games/game-actions'

export default class NoChallenger extends Component {

    constructor(options) {
        super(options);
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
                    <GameActions
                        game={this.props.game}
                        is_cancelling={this.props.is_cancelling}
                        is_rejecting={this.props.is_rejecting}
                        is_accepting={this.props.is_accepting}
                        is_joining={this.props.is_joining}
                        dispatch={this.props.dispatch} />
                </div>
            </div>
        )
    }

}