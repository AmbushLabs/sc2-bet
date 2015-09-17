import HomeButton from './home-button';
import CreateGameButton from './create-game-button';
import Coins from './coins';
import CreateGameModal from './../create-game/modal';

var NavBar = React.createClass ({
    getInitialState: function() {
        return {showModal: false};
    },
    render: function() {
        return (
            <div className="clearfix">
                <HomeButton />
                <CreateGameButton onClick={this.showModal} />
                {this.buildModal()}
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

export default NavBar;