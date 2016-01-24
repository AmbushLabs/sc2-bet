import React, { Component } from 'react';

import createWithdrawl from './../../api/coins/createWithdrawl';

export default class GosuCoinBalance extends Component {

    constructor(options) {
        super(options);
        this.gosuCoinWithdrawlAmtKeyup = this.gosuCoinWithdrawlAmtKeyup.bind(this);
        this.getBCValueForAllCoins = this.getBCValueForAllCoins.bind(this);
        this.gosuCoinToBC = this.gosuCoinToBC.bind(this);
        this.getCreateWithdrawlTextOrLoading = this.getCreateWithdrawlTextOrLoading.bind(this);
        this.state = {
            bcTransferAmount: 0
        };
    }

    render() {
        if (this.props.gosuCoins) {
            return (
                <div className="col col-12 clearfix mt3">
                    <div className="col col-1 md-col-4">&nbsp;</div>
                    <div className="col col-10 md-col-4 border mt2 mr2 ml2 mb1 gosu-light-blue-bg">
                        <div className="col col-12 p2">
                            <p className="h3 gosu-blue-text center">Current GosuCoin Balance</p>
                            <p className="h5 center">
                                You have <span className="bold gosu-blue-text">{this.props.gosuCoins.remaining} GC</span><br />
                                valued at <span className="bold gosu-blue-text">{this.getBCValueForAllCoins()} BC</span>.
                            </p>
                        </div>
                        <div className="col col-12 gosu-blue-bg center white p2">
                            <label>Gosu Coins</label>
                            <input type="number" className="block col-12 mb1 field" ref="gosuCoinWithdrawlAmt" onKeyUp={() => this.gosuCoinWithdrawlAmtKeyup()} />
                            <label>Destination Wallet Address</label>
                            <input type="text" className="block col-12 mb1 field" ref="bcWalletId" />
                            <div className="h5">{this.state.bcTransferAmount} BC*</div>
                            <button className="btn btn-outline white col col-12 mt2 h5"
                                onClick={() => this.createWithdrawlClick()}
                                >{this.getCreateWithdrawlTextOrLoading()}</button>

                        </div>
                    </div>
                    <div className="col col-1 md-col-4">&nbsp;</div>
                    <div className="clearfix"></div>
                    <div className="col col-1 md-col-4">&nbsp;</div>
                        <div className="col col-10 md-col-4 ml2 mr2 mb2 center px2 black italic h6">
                            *BitCoin withdrawls will be processed within 24 hours at the rate at the time of processing.
                            The value shown is based on  the current rate and is subject to fluctuations based on the value of BitCoin.
                        </div>
                    <div className="col col-1 md-col-4">&nbsp;</div>
                </div>
            );
        }
    }

    gosuCoinWithdrawlAmtKeyup() {
        const gcNumStr = this.refs.gosuCoinWithdrawlAmt.value.trim();
        const rgx = new RegExp(/^\d+$/);
        if (gcNumStr != '' && rgx.test(gcNumStr)) {
            const gosuCoinNum = parseInt(this.refs.gosuCoinWithdrawlAmt.value, 10);
            this.setState({bcTransferAmount: this.gosuCoinToBC(gosuCoinNum)});
        } else {
            const bcTransferAmount = 0;
            this.setState({bcTransferAmount});
        }

    }

    getBCValueForAllCoins() {
        if (this.props.withdrawls && this.props.withdrawls.bit_coin && this.props.withdrawls.bit_coin.rate) {
        return this.gosuCoinToBC(this.props.gosuCoins.remaining_value);
        } else {
            return (<span className="spinner">&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        }
    }

    gosuCoinToBC(gosuCoin) {
        if (gosuCoin > 0 && this.props.withdrawls && this.props.withdrawls.bit_coin && this.props.withdrawls.bit_coin.rate) {
            const bitCoinToUSD = parseFloat(this.props.withdrawls.bit_coin.rate, 10);
            return +(gosuCoin / 100 / bitCoinToUSD).toFixed(8);
        }
        return 0;
    }

    createWithdrawlClick() {
        const gcNumStr = this.refs.gosuCoinWithdrawlAmt.value.trim();
        const rgx = new RegExp(/^\d+$/);
        if (gcNumStr != '' && rgx.test(gcNumStr) && this.refs.bcWalletId.value != '') {
            this.props.dispatch(createWithdrawl(gcNumStr, this.refs.bcWalletId.value));
            setTimeout(() => {
                this.refs.gosuCoinWithdrawlAmt.value = 0;
                this.refs.bcWalletId.value = '';
            }, 500);
        } else if (gcNumStr == '') {

        } else if (!rgx.test(gcNumStr)) {

        } else if (this.refs.bcWalletId.value == '') {

        }
    }

    getCreateWithdrawlTextOrLoading() {
        if (this.props && this.props.withdrawls && this.props.withdrawls.isCreating) {
            return (<div className="spinner white">&nbsp;</div>);
        }
        return (<div>Withdraw Coins</div>);
    }


}