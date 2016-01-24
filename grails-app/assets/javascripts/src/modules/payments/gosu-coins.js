import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddCoins from './add-coins';
import AddBankAccount from './add-bank-account';
import GosuCoinBalance from './gosu-coin-balance';

import getWithdrawlsList from './../../api/coins/getWithdrawlList'


@connect(state => (state))
export default class GosuCoins extends Component {

    render() {
        return (
            <div className="col col-12">
                <div className="col col-0 lg-col-2">
                    &nbsp;
                </div>
                <div className="col col-12 lg-col-8">
                    <p className="h1 center mt3 gosu-blue-text">Buy GosuCoin&nbsp;<span className=" gosu-coins-gold ss-icon ss-coins h2"></span></p>
                    <AddCoins
                        user={this.props.user}
                        config={this.props.config}
                        dispatch={this.props.dispatch}
                        />
                    <div className="col col-12 border-top mt3">&nbsp;</div>
                    <GosuCoinBalance
                        gosuCoins={this.props.gosuCoins}
                        withdrawls={this.props.withdrawls}
                        dispatch={this.props.dispatch}
                        />
                </div>
                <div className="col col-0 lg-col-2">
                    &nbsp;
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(getWithdrawlsList());
    }

}