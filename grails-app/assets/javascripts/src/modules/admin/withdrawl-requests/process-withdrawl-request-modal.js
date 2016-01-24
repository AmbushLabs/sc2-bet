import React, { Component } from 'react';
import moment from 'moment';

import processWithdrawl from './../../../api/coins/processWithdrawl';
import { HIDE_PROCESS_WITHDRAWL_MODAL } from './../../../actions/actions';

export default class extends Component {

    constructor(options) {
        super(options);
        this.onSubmit = this.onSubmit.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    render() {
        const { withdrawl_request } = this.props;
        const dollarAmount = parseFloat(withdrawl_request.coin_amount/100).toFixed(2);
        const dateStr = moment(withdrawl_request.create_date).format("M/D/YYYY H:mm");

        return (
            <div className="modal" id="process-withdrawl-request-modal" onClick={(ev) => this.hideModal(ev)}>
                <div className="modal-dialog col col-12 sm-col-6 animated slideInDown" onClick={(ev) => this.preventBubble(ev)}>
                    <form className="" onSubmit={(ev) => this.onSubmit(ev)}>
                        <div className="modal-header clearfix">
                            <div className="col col-12 mt1 mb1 h2">Complete Withdrawl Request</div>
                            <div className="col col-12 mb1 h5">Make sure you complete the withdrawl, then enter the info here.</div>
                        </div>
                        <div className="modal-body clearfix">
                            <div className="col col-12 h6 white">
                                <div className="col col-3">User:</div>
                                <div className="col col-9"><a href={"/p/" + withdrawl_request.user.id} target="_blank">{withdrawl_request.user.battle_tag}</a></div>
                                <div className="col col-3">Dollar Amount:</div>
                                <div className="col col-9">${dollarAmount}</div>
                                <div className="col col-3">GosuCoin Amount:</div>
                                <div className="col col-9">{withdrawl_request.coin_amount} GC</div>
                                <div className="col col-3">BitCoin Wallet Address:</div>
                                <div className="col col-9">{withdrawl_request.bit_coin_wallet_id}</div>
                                <div className="col col-3">Date Requested:</div>
                                <div className="col col-9">{dateStr}</div>
                            </div>
                            <div className="col col-12 h6">
                                <label>BitCoin Amount</label>
                                <input type="text" className="block col-12 mb1 field" ref="bcAmount" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary black bg-darken-1" onClick={(ev) => this.hideModal(ev)}>Cancel</button>
                            <input type="submit" className="btn btn-primary ml2" value="Finish" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    preventBubble(ev) {
        ev.stopPropagation();
    }

    hideModal(ev) {
        this.props.dispatch({type: HIDE_PROCESS_WITHDRAWL_MODAL});
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    }


    onSubmit(ev) {
        const { dispatch, withdrawl_request } = this.props;
        const gosuCoinWithdrawlRequestId = withdrawl_request.id;
        const bcAmount = this.refs.bcAmount.value;

        dispatch(processWithdrawl(gosuCoinWithdrawlRequestId, bcAmount))
            .then(() =>
                dispatch({
                    type: HIDE_PROCESS_WITHDRAWL_MODAL
                })
        );
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    }

};