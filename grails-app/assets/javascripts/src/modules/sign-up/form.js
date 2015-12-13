import React, { Component } from 'react';

export default class EnterEmailForm extends Component {
    render() {
        return (
            <div>
                <h5>We use email to communicate when someone challenges you or you win a contest. We will not spam your account or share your info.</h5>

                <input type="email" className="block col-12 mb1 field" ref="emailAddress" placeholder="glhf@example.com" />
            </div>
        );
    }
};