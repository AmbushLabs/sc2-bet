import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateGameForm from './form';
import { SET_NOTIFICATION, CREATE_GAME, HIDE_CREATE_GAME_MODAL } from './../../actions/actions';

@connect(state => (state))
export default class CreateGameModal extends Component {

    constructor(options) {
        super(options);
        this.preventBubble = this.preventBubble.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getErrorState = this.getErrorState.bind(this);
    }

    render() {
        return (
            <div className="modal" id="create-game-modal" onClick={this.props.hideModal}>
                <div className="modal-dialog col col-6" onClick={this.preventBubble}>
                    <form className="">
                        <div className="modal-header clearfix">
                            <h2 className="col col-11 mt1 mb1">Create a Game</h2>
                            <a href="#" className="btn-close col col-1 center mt1" onClick={this.props.hideModal}>×</a>
                        </div>
                        <div className="modal-body">
                            <CreateGameForm ref="gameForm" />
                            {this.getErrorState()}
                        </div>
                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary mr2" onClick={this.onSubmit} value="Create Game" />
                            <button type="reset" className="btn btn-primary black bg-gray" onClick={this.props.hideModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    preventBubble(ev) {
        ev.stopPropagation();
    }

    getErrorState() {
        if (this.props.errors && this.props.errors.error) {
            if (this.props.errors.reasonType === 'not_enough_coins') {
                return (
                    <div className="border white bg-red">
                        Not enough coins yo. Gotta get some more to create a game.
                    </div>
                );
            }
        }
    }

    onSubmit(ev) {
        var wagerAmount = this.refs.gameForm.refs.wagerAmount.value;
        if (_.isEmpty(wagerAmount)) {
            this.showSubmitError();
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        }
        const { dispatch } = this.props;
        dispatch(createGame(wagerAmount));
            //.then(() =>
//
//        );
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    }

    showSubmitError() {
        alert('error :(');
    }
};

function createGame(wagerAmount) {
    return function(dispatch) {
        dispatch({
            type: CREATE_GAME,
            isFetching: true
        });
        return fetch('/game', {
            method:'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "wager=" + wagerAmount,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: CREATE_GAME,
                    isFetching: false,
                    status: 'success',
                    data: json
                });
                if (!json.error) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        message: 'Game created!'
                    });
                    dispatch({
                        type:HIDE_CREATE_GAME_MODAL
                    });
                }
            }
        );

    }
}

