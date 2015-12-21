import React from 'react';
import HomeButton from './home-button';
import Coins from './coins';


var NavBar = React.createClass ({
    render: function() {
        if (!this.props.loggedIn) {
            return (
                <nav className="clearfix black border-bottom gosu-blue-bg">
                    <HomeButton />
                    <a href="#" className="h6 btn btn-primary right m2 mr4" onClick={this.signUp}>Login with Battle.net</a>
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
    },
    signUp: function() {
        var loginWindow = window.open(
            '/auth/bnet_start_auth',
            'targetWindow',
            'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=400'
        );
        const { dispatch } = this.props;
        var windowChecker = setInterval(function() {
            if (loginWindow.closed) {
                clearInterval(windowChecker);
                dispatch(checkEmail());
            }
        }.bind(this), 50);
    }
});

export default NavBar;