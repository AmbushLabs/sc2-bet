import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WithdrawlRequestList from './withdrawl-requests/withdrawl-request-list';
import WithdrawlRequestModal from './withdrawl-requests/process-withdrawl-request-modal';

import GosuCoinTransactionList from './gosu-coin-transactions/gosu-coin-transaction-list';

import UserList from './users/user-list';

import initializeAdmin from './../../api/admin/initialize';

@connect(state => (state))
class Admin extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        const { dispatch, csrf } = this.props;
        const { withdrawl_requests, recent_transactions, withdrawl_request_modal, recent_users, authorized } = this.props.admin;
        if (!authorized) {
            return (<div className="p2">404</div>);
        }
        return (
            <section className="bg-darken-1 p2 clearfix">
                <section className="col col-12 bg-white p1 mb2">
                    <div className="col col-12">
                        <p className="h3 ml1 mt1 mr1">Withdrawl Requests</p>
                    </div>
                    <section className="col col-12 m1">
                        <WithdrawlRequestList
                            withdrawl_requests={withdrawl_requests}
                            dispatch={dispatch}
                            csrf={csrf}
                            />
                    </section>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12 bg-white p1">
                    <div className="col col-12">
                        <p className="h3 ml1 mt1">Recent Transactions</p>
                    </div>
                    <section className="col col-12 m1">
                        <GosuCoinTransactionList
                            recent_transactions={recent_transactions}
                            dispatch={dispatch}
                            csrf={csrf}
                            />
                    </section>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12 bg-white p1">
                    <div className="col col-12">
                        <p className="h3 ml1 mt1">Recent Users</p>
                    </div>
                    <section className="col col-12 m1">
                        <UserList
                            users={recent_users}
                            dispatch={dispatch}
                            csrf={csrf}
                            />
                    </section>
                </section>
                {this.getProcessWithdrawlRequestModal(withdrawl_request_modal, dispatch, csrf)}
            </section>
        );
    }

    componentDidMount() {
        this.props.dispatch(initializeAdmin(this.props.csrf.value));
    }

    getProcessWithdrawlRequestModal(withdrawlRequestModal, dispatch, csrf) {
        if (withdrawlRequestModal.show) {
            return (
                <WithdrawlRequestModal
                    dispatch={dispatch}
                    withdrawl_request={withdrawlRequestModal.withdrawl_request}
                    csrf={csrf}
                    />
            );
        }
    }
};

export default Admin;