import React, { Component, PropTypes } from 'react';
import { CHECK_EMAIL_ADDRESS } from './../../actions/actions';

export default class LandingPage extends Component {

    constructor(options) {
        super(options);
        this.signUp = this.signUp.bind(this);
    }

    render() {
        var bgImage = {
            backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/gosuempire/assets/banner-gosu-empire.png)',
            WebkitTransition: 'all',
            msTransition: 'all'
        }
        var bgImageMain = {
            backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/gosuempire/assets/main_bg.png)',
            WebkitTransition: 'all',
            msTransition: 'all'

        }
        return (
        <div>
            <header className="center px3 py4 white bg-no-repeat bg-cover bg-center" style={bgImage} >
                <h1 className="h1 h0-responsive caps mt4 mb0 regular">GosuEmpire</h1>
                <p className="h3">Win real money playing Starcraft 2 against your friends</p>
                <a href="#" className="h4 btn btn-primary mb4" onClick={this.signUp}>Play Now For Free</a>
            </header>
            <section className="container center p2 bg-cover bg-center" style={bgImageMain}>
                <div className="flex flex-wrap mxn2">
                    <div className="sm-col-12 md-col-4">
                        <div className="p1 m2">
                            <div className="ss-icons ss-userprofile h1 mt2"></div>
                            <h2>Create an Account</h2>
                            <p className="m0">Signup by linking your battle.net account to GosuEmpire.</p>
                        </div>
                    </div>
                    <div className="sm-col-12 md-col-4">
                        <div className="p1 m2">
                            <div className="ss-icons ss-videogame h1 mt2"></div>
                            <h2>Join a Match</h2>
                            <p className="m0">Buy some GosuCoin or join a free contest to play against friends or strangers.</p>
                        </div>
                    </div>
                    <div className="sm-col-12 md-col-4">
                        <div className="p1 m2">
                            <div className="ss-icons ss-moneybag h1 mt2"></div>
                            <h2>Win Real Cash</h2>
                            <p className="m0">Upload the replay from your match. GosuEmpire automatically determines the winners from data stored in SC2 replays and pays out the winner.</p>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        );
    }

    signUp() {
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
}

const checkEmail = () => {
    return (dispatch) => {
        return fetch('/user/hasEmail', {credentials:'include'})
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: CHECK_EMAIL_ADDRESS,
                    data: json
                })
            );
    }
}