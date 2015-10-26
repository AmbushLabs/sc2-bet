import React from 'react';

var Coins = React.createClass({
    render: function() {
        return (
            <a className="right center h2 py1 px2" href="/gosucoins">
                {this.props.wagerTokens}
                <span className="ss-icon ss-coins"></span>
            </a>
        );
    }
});

export default Coins;