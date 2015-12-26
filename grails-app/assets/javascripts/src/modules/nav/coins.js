import React from 'react';

var Coins = React.createClass({
    render: function() {
        return (
            <div className="col col-12 sm-col-6">
                <a className="right center h2 px2 white text-header" href="/gosucoins">
                    <span className="ss-icon ss-coins h4"></span>
                    <span className="h4">&nbsp;</span>
                    <span>{this.props.wagerTokens}</span>
                </a>
            </div>
        );
    }
});

export default Coins;