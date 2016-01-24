import React, { Component } from 'react';
import moment from 'moment';

import { SHOW_PROCESS_WITHDRAWL_MODAL } from './../../../actions/actions';

export default class extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        const { withdrawl_request, gray, dispatch } = this.props;
        const dollarAmount = parseFloat(withdrawl_request.coin_amount/100).toFixed(2);
        const dateStr = moment(withdrawl_request.create_date).format("M/D/YYYY H:mm");

        return (
            <div className={"col col-12" + (gray ? " bg-darken-1 " : " bg-white") }>
                <div className="col col-3 p1">
                    <a href={"/p/" + withdrawl_request.user.id} target="_blank">{withdrawl_request.user.battle_tag}</a>
                </div>
                <div className="col col-1 p1">
                    ${dollarAmount}
                </div>
                <div className="col col-1 p1">
                    {withdrawl_request.coin_amount} GC
                </div>
                <div className="col col-5 p1">
                    {withdrawl_request.bit_coin_wallet_id}
                </div>
                <div className="col col-1 p1">
                    {dateStr}
                </div>
                <div
                    className="col col-1 p1">
                    <button className="col col-12 h6 btn btn-outline"
                            onClick={() => dispatch({ type:SHOW_PROCESS_WITHDRAWL_MODAL, data:{ withdrawl_request:withdrawl_request }})}>
                        Resolve
                    </button>
                </div>
            </div>
        );
    }


};