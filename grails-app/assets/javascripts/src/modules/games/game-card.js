import React from './../../lib/react';
import ReactIntl from './../../lib/react-intl';

var FormattedNumber = ReactIntl.FormattedNumber;

var GameCard = React.createClass({
    mixins:[ReactIntl.IntlMixin],
    getInitialState: function() {
        return {
            isLoading: false,
            isJoining: false,
            isCancelling: false,
            isAccepting: false,
            isRejecting: false
        };
    },
    render: function() {
        return (
            <div className={"col " + this.props.colSize}>
                <div className="m1 p1 clearfix bg-black white">
                    <div className="bg-lighten-3">
                        <div className="col col-4 left-align">
                            <h6>{this.getIntlMessage('CREATOR')}</h6>
                            {this.getUserDisplay(this.props.game.creator)}
                        </div>
                        <div className="col col-4 center">
                            <h6>{this.getIntlMessage('WAGER')}</h6>
                            <h1 className="mt1">
                                <FormattedNumber
                                    value={this.props.game.wager} />&nbsp;
                                <span className="ss-icon ss-coins h2"></span>
                            </h1>
                        </div>
                        <div className="col col-4 right-align">
                            <h6>{this.getIntlMessage('CHALLENGER')}</h6>
                            {this.getUserDisplay(this.props.game.challenger)}
                        </div>
                        <div className="col col-12">
                            {this.getControls()}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    getUserDisplay: function(user) {
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
    },
    getControls: function() {
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
                                    {this.getTextOrLoader(this.getIntlMessage('CANCEL'), 'cancel')}
                                </button>
                            </div>
                            <div className="col col-4">
                                <button className="btn btn-primary mb1 mt1 bg-maroon mr1 col-11" onClick={this.rejectChallenger}>
                                    {this.getTextOrLoader(this.getIntlMessage('REJECT'), 'reject')}
                                </button>
                            </div>
                            <div className="col col-4">
                                <button className="btn btn-primary mb1 mt1 bg-blue ml1 col-11" onClick={this.acceptChallenger}>
                                    {this.getTextOrLoader(this.getIntlMessage('ACCEPT'), 'accept')}
                                </button>
                            </div>
                        </div>
                    );
                }
            } else {
                return (
                    <button className="btn btn-primary mb1 mt1 bg-red col-12" onClick={this.cancelGame}>
                        {this.getTextOrLoader(this.getIntlMessage('CANCEL'), 'cancel')}
                    </button>
                );
            }
        } else {
            if (this.props.game.is_challenger) {
                if (this.props.game.has_creator_accepted) {
                    //ok this game is a go for you
                    return this.getDisabledButton(this.getIntlMessage('PLAY_TIME'))
                } else {
                    //waiting on them to say cool
                    return this.getDisabledButton(this.getIntlMessage('WAITING_TO_ACCEPT'));
                }
            } else if (this.props.game.has_challenger) {
                //already has a challenger
                return this.getDisabledButton(this.getIntlMessage('ALREADY_MATCHED'));
            } else {
                //there is no challenger, show join
                return (
                    <button className="btn btn-primary mb1 mt1 bg-blue col col-12" onClick={this.joinGame}>
                        {this.getTextOrLoader(this.getIntlMessage('JOIN'), 'join')}
                    </button>
                );
            }
        }
    },
    getDisabledButton: function(text) {
        return (
            <button className="btn btn-primary mb1 mt1 col col-12 bg-blue is-disabled">{text}</button>
        );
    },
    getTextOrLoader: function(text, type) {
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
    },
    joinGame: function() {
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
    },
    cancelGame: function() {
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
    },
    acceptChallenger: function() {
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
    },
    rejectChallenger: function() {
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
});

export default GameCard;