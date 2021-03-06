import React, { Component, PropTypes } from 'react';
import { CHECK_EMAIL_ADDRESS } from './../../actions/actions';
import signupWindow from './../user/signup-window';

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
            <header className="center px3 py4 white bg-cover" style={bgImage} >
                <h1 className="h1 h0-responsive caps mt4 mb0 regular">GosuEmpire</h1>
                <p className="h3">Win real money playing Starcraft with your friends</p>
                <a href="#" className="h4 btn btn-primary mb4" onClick={this.signUp}>Play Now For Free</a>
            </header>
            <section className=" center p2 bg-cover bg-center" style={bgImageMain}>
                <div className="flex flex-wrap mxn2">
                    <div className="col col-12 md-col-4 mx-auto">
                        <div className="p1 m2">
                            <div className="big-symbol ss-icons ss-userprofile mt2"></div>
                            <h2>Signup for Free</h2>
                            <p className="m0">Signup by linking your battle.net account to GosuEmpire.</p>
                        </div>
                    </div>
                    <div className="col col-12 md-col-4 mx-auto">
                        <div className="p1 m2">
                            <div className="big-symbol ss-icons ss-videogame mt2"></div>
                            <h2>Join a Contest</h2>
                            <p className="m0">Buy some GosuCoin or join a free contest to play against friends or strangers.</p>
                        </div>
                    </div>
                    <div className="col col-12 md-col-4 mx-auto">
                        <div className="p1 m2">
                            <div className="big-symbol ss-icons ss-moneybag mt2"></div>
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
        signupWindow(this.props.dispatch, this.props.csrf);
    }
}

