import React, { Component } from 'react';
import { HIDE_SHARE_GAME_MODAL } from './../../actions/actions';

export default class ShareModal extends Component {

    constructor(options) {
        super(options);
        this.shareFacebook = this.shareFacebook.bind(this);
        this.shareTwitter = this.shareTwitter.bind(this);
        this.shareGooglePlus = this.shareGooglePlus.bind(this);
    }

    render() {
        const { game, dispatch } = this.props;
        const hideData = {
            gameId: game.id
        };
        return (
            <div className="modal" id="share-modal" onClick={() => dispatch({type: HIDE_SHARE_GAME_MODAL, data: hideData})}>
                <div className="modal-dialog col col-6" onClick={this.preventBubble}>
                        <div className="modal-header clearfix">
                            <h2 className="col col-11 mt1">Share Game</h2>
                            <div className="col col-1 right-align">
                                <button className="btn h3"
                                      onClick={() => dispatch({type: HIDE_SHARE_GAME_MODAL, data: hideData})}>x</button>
                            </div>
                        </div>
                        <div className="modal-body overflow-hidden">
                            <div className="col col-12">Invite your friends to play by using this link:</div>
                            <div className="col col-12 p1 border mt1">
                                {game.link}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="col col-12">
                                <div className="col col-12 center">Or share on these networks:</div>
                                <div className="col col-4 center">
                                    <span className="ss-icon ss-facebook"
                                      onClick={() => this.shareFacebook()}>&nbsp;</span>
                                </div>
                                <div className="col col-4 center">
                                    <span className="ss-icon ss-twitter"
                                      onClick={() => this.shareTwitter()}>&nbsp;</span>
                                </div>
                                <div className="col col-4 center">
                                    <span className="ss-icon ss-googleplus"
                                        onClick={() => this.shareGooglePlus()}>&nbsp;</span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }

    shareFacebook() {
        alert('share facebook - ' + this.props.game.link);
    }

    shareTwitter() {
        alert('share twitter - ' + this.props.game.link);
    }

    shareGooglePlus() {
        alert('share google plus - ' + this.props.game.link);
    }

    preventBubble(ev) {
        ev.stopPropagation();
    }
}