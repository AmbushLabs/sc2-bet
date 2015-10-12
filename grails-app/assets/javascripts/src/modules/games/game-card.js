import React, { Component, PropTypes } from 'react';

import BasicUser from './../user/basic-user';
import GameActions from './game-actions';


export default class GameCard extends Component {

    constructor(options) {
        super(options);

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
                            <GameActions
                                game={this.props.game}
                                is_cancelling={this.props.is_cancelling}
                                is_rejecting={this.props.is_rejecting}
                                is_accepting={this.props.is_accepting}
                                is_joining={this.props.is_joining}
                                dispatch={this.props.dispatch} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};