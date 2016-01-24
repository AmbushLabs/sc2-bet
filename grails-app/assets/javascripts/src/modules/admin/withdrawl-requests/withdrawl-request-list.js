import React from 'react';

import WithdrawlRequest from './withdrawl-request';


export default ({ withdrawl_requests, dispatch }) => {
    var withdrawlRequestNodes = withdrawl_requests.map((withdrawl_request, index) => {
        return (
            <WithdrawlRequest
                withdrawl_request={withdrawl_request}
                dispatch={dispatch}
                gray={index%2}
                />
        );
    });
    return (
        <div className="col col-12">
            {withdrawlRequestNodes}
        </div>
    );
}