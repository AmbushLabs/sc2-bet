import React from './../../lib/react';

var Coins = React.createClass({
    render: function() {
        return (
            <div className="right center h2 py1 px2">
                {this.props.wagerTokens}
                <a className="ss-icon ss-coins" href="#"></a>
            </div>
        );
    }
});

export default Coins;