import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddCoins from './add-coins';


@connect(state => (state))
export default class GosuCoins extends Component {

    render() {
        return (
            <div>
                <AddCoins
                    user={this.props.user}
                    dispatch={this.props.dispatch}
                    />
            </div>
        );
    }

}