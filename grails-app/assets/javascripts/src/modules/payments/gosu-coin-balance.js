import React, { Component } from 'react';

export default class GosuCoinBalance extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        if (this.props.gosuCoins) {
            return (
                <div className="sm-col-6 border p2 m2 clearfix">
                    <div className="col sm-col-8">
                        You currently have {this.props.gosuCoins.remaining} GC,
                        valued at ${this.props.gosuCoins.remaining_value}
                    </div>
                    <div className="col sm-col-4 right">
                        <button type="button" className="btn btn-primary">Withdraw</button>
                    </div>
                </div>
            );
        }
    }

}