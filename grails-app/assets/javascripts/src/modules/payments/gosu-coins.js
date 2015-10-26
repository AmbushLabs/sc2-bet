import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddCoins from './add-coins';
import AddBankAccount from './add-bank-account';
import GosuCoinBalance from './gosu-coin-balance';


@connect(state => (state))
export default class GosuCoins extends Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <AddCoins
                    user={this.props.user}
                    dispatch={this.props.dispatch}
                    />
                <GosuCoinBalance
                    gosuCoins={this.props.gosuCoins}
                    />
                <AddBankAccount

                    />

            </div>
        );
    }

}