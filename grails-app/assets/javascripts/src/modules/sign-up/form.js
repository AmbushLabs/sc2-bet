import React, { Component } from 'react';

export default class EnterEmailForm extends Component {
    render() {
        const { referral } = this.props;
        const refCodeInput = (referral && referral.code && referral.code != '')
            ? (<input type="text" className="block col-12 mb1 field" ref="referralCode" value={referral.code} placeholder="optional" />)
            : (<input type="text" className="block col-12 mb1 field" ref="referralCode" placeholder="optional" />);
        return (
            <div>
                <h5 className="mb1 gray">We use email to communicate when you are sent a challenge or you win a contest. We will not spam your account or share your info.</h5>
                <input type="email" className="block col-12 mb1 field" ref="emailAddress" placeholder="glhf@example.com" />
                <h5></h5>
                <label className="gray h5">Referral Code</label>
                {refCodeInput}
            </div>
        );
    }
};