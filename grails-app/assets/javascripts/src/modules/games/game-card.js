var GameCard = React.createClass({
    render: function() {
        return (
            <div className="col col-4">
                <div className="border m2 p2">
                    Wager: {this.props.wager}<br />
                    {this.props.characterName}<br />
                    {this.props.primaryRace}<br />
                    {this.props.highest1v1Rank}
                </div>
            </div>
        );
    }
});

export default GameCard;