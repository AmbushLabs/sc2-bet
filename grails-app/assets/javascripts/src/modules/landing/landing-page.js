import React, { Component, PropTypes } from 'react';

export default class LandingPage extends Component {

    constructor(options) {
        super(options);
        this.signUp = this.signUp.bind(this);
    }

    render() {
        return (
        <div>
            <header className="center px3 py4 white bg-navy bg-cover bg-center">
                <h1 className="h1 h0-responsive caps mt4 mb0 regular">Gosu Wager</h1>
                <p className="h3">Play the craphts for the duckets with yo friends</p>
                <a href="#" className="h4 btn btn-primary mb4" onClick={this.signUp}>Sign up</a>
            </header>
            <section className="container center p2">
                <div className="flex flex-wrap mxn2">
                    <div className="sm-col-12 md-col-4">
                        <div className="p1 border rounded m2">
                            <img src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="256" height="auto" />
                            <h2>Explanation 1</h2>
                            <p className="m0">Card</p>
                        </div>
                    </div>
                    <div className="sm-col-12 md-col-4">
                        <div className="p1 border rounded m2">
                            <img src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="256" height="auto" />
                            <h2>Explanation 2</h2>
                            <p className="m0">Card</p>
                        </div>
                    </div>
                    <div className="sm-col-12 md-col-4">
                        <div className="p1 border rounded m2">
                            <img src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="256" height="auto" />
                            <h2>Explanation 3</h2>
                            <p className="m0">Card</p>
                        </div>
                    </div>
                </div>
                </section>
                <section className="bg-silver">
                    <section className="container px2 py3">
                        <h1 className="mt0">
                            So much fun for everyone
                        </h1>
                        <div className="clearfix mxn2">
                            <div className="sm-col sm-col-8 md-col-9 px2">
                                <div>
                                    <h2 className="h3">
                                        Some info about something
                                    </h2>
                                    <p>Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank tongue pig drumstick capicola swine short loin ham hock kevin.</p>
                                    <a href="#">Sup with that?</a>
                                </div>
                                <div>
                                    <h2 className="h3">
                                        <a href="#" className="black">
                                            Another more info
                                        </a>
                                    </h2>
                                    <p>Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank tongue pig drumstick capicola swine short loin ham hock kevin.</p>
                                    <a href="#">Maybe you want more?</a>
                                </div>
                            </div>
                            <div className="sm-col sm-col-4 md-col-3 px2 sm-show">
                                <h3 className="h4">Things about other things</h3>
                                <ul className="list-reset">
                                    <li><a href="#" className="">Bacon</a></li>
                                    <li><a href="#" className="">Bratwurst</a></li>
                                    <li><a href="#" className="">Andouille</a></li>
                                    <li><a href="#" className="">Pork Loin</a></li>
                                    <li><a href="#" className="">Corned Beef</a></li>
                                    <li><a href="#" className="">Pastrami</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>
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
        var windowChecker = setInterval(function() {
            if (loginWindow.closed) {
                clearInterval(windowChecker);
                window.location.href = '/';
            }
        }, 50);
    }
}