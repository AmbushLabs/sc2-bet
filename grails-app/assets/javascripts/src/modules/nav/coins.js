import React from 'react';

var Coins = React.createClass({
    render: function() {
        return (
            <a className="right center h2 py1 px2 white" href="/gosucoins">
                <span className="ss-icon ss-coins h4"></span>
                <span className="h4">&nbsp;</span>
                <span>{this.props.wagerTokens}</span>
            </a>
        );
    }
});

export default Coins;