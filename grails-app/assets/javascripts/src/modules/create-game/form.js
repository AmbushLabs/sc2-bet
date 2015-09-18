import React from './../../lib/react';

var CreateGameForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var wagerAmount = React.findDOMNode(this.refs.wager_amount).value.trim();
        if (!wagerAmount) {
            return;
        }
        // TODO: send request to the server
        React.findDOMNode(this.refs.wager_amount).value = '';
        return;
    },
    render: function() {
        return (
            <div>
                <h3>Set the number of tokens to wager</h3>
                <label>Wager Amount</label>
                <input type="number" className="block col-12 mb1 field" ref="wagerAmount" />
            </div>
        );
    }
});

export default CreateGameForm;