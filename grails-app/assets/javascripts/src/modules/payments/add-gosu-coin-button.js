import React, { Component } from 'react';
import purchase from './../../api/coins/purchase';

export default class AddGosuCoinButton extends Component {

    constructor(options) {
        super(options);
        this.showBuyCoins = this.showBuyCoins.bind(this);
    }

    render() {
        return (
            <button onClick={this.showBuyCoins} className="btn btn-outline blue m2 h5 gosu-blue-text">Add {this.props.numCoins} GC<br />for ${this.props.price}</button>
        );
    }

    showBuyCoins(e) {
        const { dispatch, priceCents } = this.props;
        var handler = StripeCheckout.configure({
            key: this.props.config.stripe_key,
            image: 'https://s3-us-west-2.amazonaws.com/gosuempire/assets/logo-inverse-transparent-lg.png',
            locale: 'auto',
            token: function(token) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`
                dispatch(purchase(token.id, token.email, priceCents));
            }
        });

        handler.open({
            name: 'Gosu Wager',
            description: this.props.numCoins + ' coins',
            amount: priceCents,
            bitcoin: false,
            zipCode: true,
            email: this.props.user.email
            //billingAddress: true
        });

        e.preventDefault();
    }

};


