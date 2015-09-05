<nav class="clearfix black" id="logged_in_nav">

</nav>

<script type="text/jsx">
    var HomeButton = React.createClass({
        render: function() {
            return (
                <div className="sm-col">
                    <a href="#" className="btn py2">Home</a>
                </div>
            );
        }
    });
    var FindGameButton = React.createClass({
        render: function() {
            return (
                <div className="sm-col">
                    <a href="#" className="btn py2">Find a Game</a>
                </div>
            );
        }
    });
    var CreateGameButton = React.createClass({
        render: function() {
            return (
                <div className="sm-col" onClick={this.props.onClick}>
                    <a href="#" className="btn py2">Create Game</a>
                </div>
            );
        }
    });

    var AccountButton = React.createClass({
        render: function() {
            return (
                <div className="right center h2 py1 px2">
                    <a className="ss-icon ss-user" href="#"></a>
                </div>
            );
        }
    });

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

    var NavigationBar = React.createClass({
        getInitialState: function() {
            return {showModal: false};
        },
        render: function() {
            return (
                <div className="clearfix">
                    <HomeButton />
                    <FindGameButton  />
                    <CreateGameButton onClick={this.showModal} />
                    {this.buildModal()}
                    <AccountButton />
                    <Coins wagerTokens={this.props.wagerTokens} />
                </div>
            );
        },
        buildModal: function() {
            if (!this.state.showModal) {
                return;
            }
            return (
                <CreateGameModal hideModal={this.hideModal} />
            );
        },
        showModal: function() {
            this.setState({showModal:true});
        },
        hideModal: function() {
            this.setState({showModal:false});
        },
        componentDidMount: function() {
            $.ajax({
                url:'/game/list',
                success: $.proxy(function(resp) {
                    this.setProps({games:resp});
                },this)
            });
        }
    });
    React.render(
        <NavigationBar />,
        document.getElementById('logged_in_nav')
    );
</script>