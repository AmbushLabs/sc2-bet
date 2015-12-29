import React from 'react';
import GameCard from "./game-card";

var GamePage = React.createClass({

    getInitialState: function() {
        return {

        };
    },
    render: function() {
        return (
            <div>hi! another page yea!</div>
        );
    },
    componentDidMount: function() {
        console.log(this.props);
    }
});

export default GamePage;