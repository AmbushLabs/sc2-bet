import React from 'react';
import ReactIntl from 'react-intl';
import GameCard from "./game-card";

var GamePage = React.createClass({
    mixins:[ReactIntl.IntlMixin],
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