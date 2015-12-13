import React, { Component, PropTypes } from 'react';
import EmailAddressForm from './form';

export default class EnterEmailModal extends Component {

    constructor(options) {
        super(options);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.showSubmitError = this.showSubmitError.bind(this);
    }

    render() {
        return (
            <div className="modal" id="enter-email-modal">
                <div className="modal-dialog col col-6" onClick={this.preventBubble}>
                    <form className="" onSubmit={this.onSubmit}>
                        <div className="modal-header clearfix">
                            <h2 className="col col-11 mt1 mb1">Please Enter Your Email Address</h2>
                        </div>
                        <div className="modal-body">
                            <EmailAddressForm ref="emailForm" />
                        </div>
                        <div className="modal-footer">
                            <input type="submit" className="btn btn-primary mr2" value="Finish" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    preventBubble(ev) {
        ev.stopPropagation();
    }

    validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    onSubmit(ev) {
        var emailAddress = this.refs.emailForm.refs.emailAddress.value;
        var referralCode = this.refs.emailForm.refs.referralCode.value;
        if (_.isEmpty(emailAddress) || !this.validateEmail(emailAddress)) {
            this.showSubmitError();
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        }
        const { dispatch } = this.props;
        dispatch(linkEmailAddress(emailAddress, referralCode))
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
        alert('Please enter a valid email address :(');
    }
};

function linkEmailAddress(emailAddress, referralCode) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_EMAIL_ADDRESS',
            isFetching: true
        });
        return fetch('/user/email' , {
            method:'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "email_address=" + emailAddress + '&referral_code=' + referralCode,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: 'ADD_EMAIL_ADDRESS',
                    isFetching: false,
                    status: 'success',
                    data: json
                })
        );

    }
}

