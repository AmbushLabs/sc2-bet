import React, { Component } from 'react';

import AddGosuCoinButton from './add-gosu-coin-button';

export default class AddCoins extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        return (
            <div className="col col-12 clearfix">
                <div className="col col-12 md-col-6 lg-col-3 center">
                    <AddGosuCoinButton
                        price="5.00"
                        priceCents={500}
                        numCoins={500}
                        user={this.props.user}
                        dispatch={this.props.dispatch}
                        config={this.props.config}
                        />
                </div>
                <div className="col col-12 md-col-6 lg-col-3 center">
                <AddGosuCoinButton
                    price="10.00"
                    priceCents={1000}
                    numCoins={1025}
                    user={this.props.user}
                    dispatch={this.props.dispatch}
                    config={this.props.config}
                    />
                </div>
                <div className="col col-12 md-col-6 lg-col-3 center">
                <AddGosuCoinButton
                    price="20.00"
                    priceCents={2000}
                    numCoins={2060}
                    user={this.props.user}
                    dispatch={this.props.dispatch}
                    config={this.props.config}
                    />
                </div>
                <div className="col col-12 md-col-6 lg-col-3 center">
                <AddGosuCoinButton
                    price="50.00"
                    priceCents={5000}
                    numCoins={5175}
                    user={this.props.user}
                    dispatch={this.props.dispatch}
                    config={this.props.config}
                    />
                </div>
            </div>
        );
    }

}