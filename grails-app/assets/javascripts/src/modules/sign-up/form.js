import React, { Component } from 'react';

export default class EnterEmailForm extends Component {
    render() {
        return (
            <div>
                <h3>Add your email address to your account</h3>
                <label>Email address</label>
                <input type="email" className="block col-12 mb1 field" ref="emailAddress" />
            </div>
        );
    }
};