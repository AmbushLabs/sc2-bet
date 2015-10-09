import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


export default class GameCard extends Component {

    constructor(options) {
        super(options);
        this.getUserDisplay = this.getUserDisplay.bind(this);
        this.getControls = this.getControls.bind(this);
        this.getDisabledButton = this.getDisabledButton.bind(this);
        this.getTextOrLoader = this.getTextOrLoader.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.acceptChallenger = this.acceptChallenger.bind(this);
        this.rejectChallenger = this.rejectChallenger.bind(this);
        this.state = {
            isLoading: false,
            isJoining: false,
            isCancelling: false,
            isAccepting: false,
            isRejecting: false
        };
    }

    render() {
        return (
            <div className={"col " + this.props.colSize}>
                <div className="m1 p1 clearfix bg-black white">
                    <div className="bg-lighten-3">
                        <div className="col col-4 left-align">
                            <h6>Creator</h6>
                            {this.getUserDisplay(this.props.game.creator)}
                        </div>
                        <div className="col col-4 center">
                            <a className="h6" href={"/w/" + this.props.game.id}>
                                Wager
                            </a>
                            <h1 className="mt1">
                                {this.props.game.wager}&nbsp;
                                <span className="ss-icon ss-coins h2"></span>
                            </h1>
                        </div>
                        <div className="col col-4 right-align">
                            <h6>Challenger</h6>
                            {this.getUserDisplay(this.props.game.challenger)}
                        </div>
                        <div className="col col-12">
                            {this.getControls()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getUserDisplay(user) {
        if (_.isUndefined(user) || _.isNull(user)) {
            return;
        }
        return (
            <div className="h4 mt1">
                {user.display_name}<br />
                {user.primary_race}<br />
                {user.highest_1v1_rank}
            </div>
        );
    }

    getControls() {
        if (!this.props.game.is_active) {
            return this.getDisabledButton('Wager cancelled');
        }
        if (this.props.game.is_creator) {
            if (this.props.game.has_challenger) {
                if (this.props.game.has_creator_accepted) {
                    return this.getDisabledButton('Play time!')
                } else {
                    return (
                        <div>
                            <div className="col col-4">
                                <button className="btn btn-primary mb1 mt1 bg-red mr1 col-11" onClick={this.cancelGame}>
                                    {this.getTextOrLoader('Cancel', 'cancel')}
                                </button>
                            </div>
                            <div className="col col-4">
                                <button className="btn btn-primary mb1 mt1 bg-maroon mr1 col-11" onClick={this.rejectChallenger}>
                                    {this.getTextOrLoader('Reject', 'reject')}
                                </button>
                            </div>
                            <div className="col col-4">
                                <button className="btn btn-primary mb1 mt1 bg-blue ml1 col-11" onClick={this.acceptChallenger}>
                                    {this.getTextOrLoader('Accept', 'accept')}
                                </button>
                            </div>
                        </div>
                    );
                }
            } else {
                return (
                    <button className="btn btn-primary mb1 mt1 bg-red col-12" onClick={this.cancelGame}>
                        {this.getTextOrLoader('Cancel', 'cancel')}
                    </button>
                );
            }
        } else {
            if (this.props.game.is_challenger) {
                if (this.props.game.has_creator_accepted) {
                    //ok this game is a go for you
                    return this.getDisabledButton('Play Time!')
                } else {
                    //waiting on them to say cool
                    return this.getDisabledButton('Waiting to Accept');
                }
            } else if (this.props.game.has_challenger) {
                //already has a challenger
                return this.getDisabledButton('Already matched');
            } else {
                //there is no challenger, show join
                return (
                    <button className="btn btn-primary mb1 mt1 bg-blue col col-12" onClick={this.joinGame}>
                        {this.getTextOrLoader('Join', 'join')}
                    </button>
                );
            }
        }
    }

    getDisabledButton(text) {
        return (
            <button className="btn btn-primary mb1 mt1 col col-12 bg-blue is-disabled">{text}</button>
        );
    }

    getTextOrLoader(text, type) {
        console.log('getTextOrLoader');
        console.log(this);
        if (this.state.isLoading) {
            if ((type == 'join' && this.state.isJoining) ||
                (type == 'cancel' && this.state.isCancelling) ||
                (type == 'reject' && this.state.isRejecting) ||
                (type == 'accept' && this.state.isAccepting)) {
                return (
                    <div className="loader">&nbsp;</div>
                );
            }
        }
        return (
            <div>{text}</div>
        );
    }

    joinGame() {
        if (this.state.isLoading) {
            return;
        }
        this.setState({isJoining:true, isLoading:true});
        $.ajax({
            url:'/game/' + this.props.game.id + '/join',
            type: 'POST',
            success: $.proxy(function(resp) {
                if (_.has('error')) {
                    //TODO: handle error
                } else {
                    this.props.game = resp.game;
                }
                this.setState({isJoining:false, isLoading:false});
            }, this)
        })
    }

    cancelGame() {
        if (this.state.isLoading) {
            return;
        }
        this.setState({isCancelling:true, isLoading:true});
        $.ajax({
            url:'/game/g/' + this.props.game.id,
            type: 'DELETE',
            success: $.proxy(function(resp) {
                if (_.has('error')) {
                    //TODO: handle error
                } else {
                    this.props.game = resp.game;
                }
                this.setState({isCancelling:false, isLoading:false});
            }, this)
        })
    }

    acceptChallenger() {
        if (this.state.isLoading) {
            return;
        }
        this.setState({isAccepting:true, isLoading:true});
        $.ajax({
            url:'/game/' + this.props.game.id + '/accept',
            type: 'POST',
            success: $.proxy(function(resp) {
                if (_.has('error')) {
                    //TODO: handle error
                } else {
                    this.props.game = resp.game;
                }
                this.setState({isAccepting:false, isLoading:false});
            },this)
        });
    }

    rejectChallenger() {
        if (this.state.isLoading) {
            return;
        }
        this.setState({isRejecting:true, isLoading:true});
        $.ajax({
            url:'/game/' + this.props.game.id + '/reject',
            type: 'POST',
            success: $.proxy(function(resp) {
                if (_.has('error')) {
                    //TODO: handle error
                } else {
                    this.props.game = resp.game;
                }
                this.setState({isRejecting:false, isLoading:false});
            },this)
        })
    }
};