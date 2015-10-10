import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateGameForm from './form';

@connect(state => (state))
export default class CreateGameModal extends Component {
    render() {
        return (
            <div className="modal" id="create-game-modal" onClick={this.props.hideModal.bind(this)}>
                <div className="modal-dialog col col-6" onClick={this.preventBubble.bind(this)}>
                    <form className="">
                        <div className="modal-header clearfix">
                            <h2 className="col col-11 mt1 mb1">Create a Game</h2>
                            <a href="#" className="btn-close col col-1 center mt1" onClick={this.props.hideModal.bind(this)}>×</a>
                        </div>
                        <div className="modal-body">
                            <CreateGameForm ref="gameForm" />
                        </div>
                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary mr2" onClick={this.onSubmit.bind(this)} value="Create Game" />
                            <button type="reset" className="btn btn-primary black bg-gray" onClick={this.props.hideModal.bind(this)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    preventBubble(ev) {
        ev.stopPropagation();
    }

    onSubmit(ev) {
        var wagerAmount = $(this.refs.gameForm.refs.wagerAmount.getDOMNode()).val();
        if (_.isEmpty(wagerAmount)) {
            console.log(wagerAmount + _.isEmpty(wagerAmount));
            this.showSubmitError();
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        }
        const { dispatch } = this.props;
        dispatch(createGame(wagerAmount))
            .then(() =>
                dispatch({
                    type:'HIDE_CREATE_GAME_MODAL'
                })
        );
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
            type: 'CREATE_GAME',
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
            .then(json =>
                dispatch({
                    type: 'CREATE_GAME',
                    isFetching: false,
                    status: 'success',
                    data: json
                })
        );

    }
}

