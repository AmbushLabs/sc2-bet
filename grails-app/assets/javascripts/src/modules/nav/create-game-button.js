var CreateGameButton = React.createClass ({
    render: function() {
        return (
            <div className="sm-col" onClick={this.props.onClick}>
                <a href="#" className="btn py2">Create Game</a>
            </div>
        );
    }
});

export default CreateGameButton;