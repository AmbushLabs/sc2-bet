import React from 'react';

import GosuCoinTransaction from './gosu-coin-transaction';


export default ({ recent_transactions, dispatch }) => {
    var recentTransactionNodes = recent_transactions.map((transaction, index) => {
        return (
            <GosuCoinTransaction
                transaction={transaction}
                dispatch={dispatch}
                gray={index%2}
                />
        );
    });
    return (
        <div className="col col-12">
            {recentTransactionNodes}
        </div>
    );
}