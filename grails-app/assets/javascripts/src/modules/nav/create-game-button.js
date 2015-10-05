import React from 'react';

var CreateGameButton = React.createClass ({
    render: function() {
        return (
            <div className="sm-col border-right" onClick={this.props.onCreateGameClick}>
                <a href="#" className="btn py2">Create Game</a>
            </div>
        );
    }
});

export default CreateGameButton;