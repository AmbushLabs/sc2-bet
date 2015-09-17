import CreateGameForm from './form';


var CreateGameModal = React.createClass({
    render: function() {
        return (
            <div className="modal" id="create-game-modal" onClick={this.props.hideModal}>
                <div className="modal-dialog col col-6" onClick={this.preventBubble}>
                    <form className="">
                        <div className="modal-header clearfix">
                            <h2 className="col col-11 mt1 mb1">Create a Game</h2>
                            <a href="#" className="btn-close col col-1 center mt1" onClick={this.props.hideModal}>×</a>
                        </div>
                        <div className="modal-body">
                            <CreateGameForm ref="gameForm" />
                        </div>
                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary mr2" onClick={this.onSubmit} value="Create Game" />
                            <button type="reset" className="btn btn-primary black bg-gray" onClick={this.props.hideModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
    preventBubble: function(ev) {
        ev.stopPropagation();
    },
    onSubmit: function(ev) {
        var wagerAmount = $(this.refs.gameForm.refs.wagerAmount.getDOMNode()).val();
        if (_.isEmpty(wagerAmount)) {
            console.log(wagerAmount + _.isEmpty(wagerAmount));
            this.showSubmitError();
            return;
        }
        $.ajax({
            type:'POST',
            url:'/game',
            data: {
                wager:wagerAmount
            },
            success:function(resp) {
                gameEventEmitter.emit('games_load', resp);
            }
        });
        ev.stopPropagation();
        ev.preventDefault();
    },
    showSubmitError: function() {
        alert('error :(');
    }
});

export default CreateGameModal;