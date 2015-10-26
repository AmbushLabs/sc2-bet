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
                    <button type="submit" className="btn btn-primary mr1">Save Account</button>
                    <button type="reset" className="btn btn-primary black bg-gray">Cancel</button>
                </form>
            </div>
        );
    }

}