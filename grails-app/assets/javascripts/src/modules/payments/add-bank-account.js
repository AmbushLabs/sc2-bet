import React, { Component } from 'react';

export default class AddCoins extends Component {

    constructor(options) {
        super(options);
    }

    render() {
        return (
            <div>
                <form className="sm-col-6 border p2 m2">
                    <label>Routing Number</label>
                    <input className="block col-12 mb1 field" type="number" name="routing_number" />
                    <label>Account Number</label>
                    <input className="block col-12 mb1 field" type="number" name="bank_account" />
                    <label>Country</label>
                    <select class="block col-12 mb1 field">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="IE">Ireland</option>
                        <option value="NO">Norway</option>
                        <option value="SE">Sweden</option>
                        <option value="UK">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="BE">Belgium</option>
                        <option value="DE">Germany</option>
                        <option value="ES">Spain</option>
                        <option value="IT">Italy</option>
                        <option value="NL">The Netherlands</option>
                    </select>
                    <button type="submit" className="btn btn-primary mr1">Save Account</button>
                    <button type="reset" className="btn btn-primary black bg-gray">Cancel</button>
                </form>
            </div>
        );
    }

}

