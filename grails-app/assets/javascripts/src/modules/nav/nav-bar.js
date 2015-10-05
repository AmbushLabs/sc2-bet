import React from 'react';
import HomeButton from './home-button';
import CreateGameButton from './create-game-button';
import Coins from './coins';


var NavBar = React.createClass ({
    render: function() {
        return (
            <div className="clearfix border-bottom">
                <HomeButton />
                <CreateGameButton onCreateGameClick={this.props.showModal} />
                <Coins wagerTokens={1} />
            </div>
        );
    }
});

export default NavBar;