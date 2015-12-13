import React from 'react';
import HomeButton from './home-button';
import Coins from './coins';


var NavBar = React.createClass ({
    render: function() {
        if (!this.props.loggedIn) {
            return (
                <nav className="clearfix black border-bottom gosu-blue-bg">
                    <HomeButton />
                    <a href="#" className="h6 btn btn-primary right m2 mr4" onClick={this.signUp}>Signup</a>
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