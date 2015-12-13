import React, { Component } from 'react';

export default class EnterEmailForm extends Component {
    render() {
        return (
            <div>
                <h5 className="mb1 gray">We use email to communicate when you are sent a challenge or you win a contest. We will not spam your account or share your info.</h5>
                <input type="email" className="block col-12 mb1 field" ref="emailAddress" placeholder="glhf@example.com" />
                <h5></h5>
                <label className="gray h5">Referral Code</label>
                <input type="text" className="block col-12 mb1 field" ref="refCode" placeholder="optional" />

            </div>
        );
    }
};