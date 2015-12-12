import React, { Component } from 'react';

export default class GosuCoinBalance extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        if (this.props.gosuCoins) {
            return (
                <div className="col col-12 clearfix mt3">
                    <div className="col col-4">&nbsp;</div>
                    <div className="col col-4 border m2 gosu-light-blue-bg">
                        <div className="col col-12 p2">
                            <p className="h3 gosu-blue-text center">Current Gosu Coin Balance</p>
                            <p className="h5 center">
                                You have <span className="bold gosu-blue-text">{this.props.gosuCoins.remaining} GC</span>,
                                valued at <span className="bold gosu-blue-text">${this.props.gosuCoins.remaining_value}</span>.
                            </p>
                        </div>
                        <div className="col col-12 gosu-blue-bg">
                            &nbsp;
                        </div>
                    </div>
                    <div className="col col-4">&nbsp;</div>
                </div>
            );
        }
    }

}