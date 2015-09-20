import React from './../../lib/react';
import HomeButton from './home-button';
import CreateGameButton from './create-game-button';
import Coins from './coins';


var NavBar = React.createClass ({
    render: function() {
        return (
            <div className="clearfix border-bottom">
                <HomeButton />
                <CreateGameButton onClick={this.props.showModal} />
                <Coins wagerTokens={this.props.wagerTokens} />
            </div>
        );
    }
});

export default NavBar;