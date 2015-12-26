import React, { Component } from 'react';

import AddGosuCoinButton from './add-gosu-coin-button';

export default class AddCoins extends Component {

    constructor(options) {
        super(options);
        this.showBuyCoins = this.showBuyCoins.bind(this);
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
                        dispatch={this.props.dispatch} />
                </div>
                <div className="col col-12 md-col-6 lg-col-3 center">
                <AddGosuCoinButton
                    price="10.00"
                    priceCents={1000}
                    numCoins={1025}
                    user={this.props.user}
                    dispatch={this.props.dispatch} />
                </div>
                <div className="col col-12 md-col-6 lg-col-3 center">
                <AddGosuCoinButton
                    price="20.00"
                    priceCents={2000}
                    numCoins={2060}
                    user={this.props.user}
                    dispatch={this.props.dispatch} />
                </div>
                <div className="col col-12 md-col-6 lg-col-3 center">
                <AddGosuCoinButton
                    price="50.00"
                    priceCents={5000}
                    numCoins={5175}
                    user={this.props.user}
                    dispatch={this.props.dispatch} />
                </div>
            </div>
        );
    }

    showBuyCoins(e) {
        var handler = StripeCheckout.configure({
            key: 'pk_test_qrKMKggClIIYnxYEtCaIPX5q',
            image: '/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`
                console.log(token);
            }
        });

        handler.open({
            name: 'Gosu Wager',
            description: '2000 coins',
            amount: 2000,
            bitcoin: true
        });

        e.preventDefault();
    }

}