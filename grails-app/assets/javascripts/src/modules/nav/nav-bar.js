import React from 'react';
import HomeButton from './home-button';
import Coins from './coins';


var NavBar = React.createClass ({
    render: function() {
        if (!this.props.loggedIn) {
            return (
                <nav className="clearfix black">
                    <div className="sm-col">
                        <a href="/" className="btn py2">Home</a>
                    </div>
                    <div className="sm-col-right">
                        <a href="/" className="btn py2">About</a>
                    </div>
                </nav>
            );
        } else {
            return (
                <div className="clearfix border-bottom gosu-blue-bg">
                    <HomeButton />
                    <Coins wagerTokens={this.props.remainingTokens} />
                </div>
            );
        }
    }
});

export default NavBar;