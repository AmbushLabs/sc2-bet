import React, { Component, PropTypes } from 'react';

class WagerAmount extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        return (
            <div className="col col-1 circle border h2 blue m2 center py3">
                <div className="h2">{this.props.wager}</div>
                <div className="h5">GOSU COINS</div>
            </div>
        );
    }

}

export default WagerAmount;