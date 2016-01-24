import React, { Component } from 'react';
import moment from 'moment';

import { SHOW_PROCESS_WITHDRAWL_MODAL } from './../../../actions/actions';

export default class extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        const { transaction, gray, dispatch } = this.props;
        const dateStr = moment(transaction.create_date).format("M/D/YYYY H:mm");

        return (
            <div className={"col col-12" + (gray ? " bg-darken-1 " : " bg-white") }>
                <div className="col col-4 p1">
                    {transaction.coin_amount} GC
                </div>
                <div className="col col-4 p1">
                    {transaction.type}
                </div>
                <div className="col col-4 p1">
                    {dateStr}
                </div>
            </div>
        );
    }


};