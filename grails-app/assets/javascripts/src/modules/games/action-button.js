import React, { Component, PropTypes } from 'react';

export default class ActionButton extends Component {

    render() {
        if (this.props.is_disabled) {
            return (
                <button className={this.props.className}>
                    {this.props.disabled_text}
                </button>
            );
        }
        return (
            <button
                className={this.props.className}
                onClick={this.props.onClick}>
                {this.getTextOrLoader(this.props.buttonType)}
            </button>
        );
    }

    getTextOrLoader(text) {
        const type = text.toLowerCase();
        if (this.props.is_fetching) {
            if ((type == 'join' && this.props.is_joining) ||
                (type == 'cancel' && this.props.is_cancelling) ||
                (type == 'reject' && this.props.is_rejecting) ||
                (type == 'accept' && this.props.is_accepting)) {
                return (
                    <div className="loader">&nbsp;</div>
                );
            }
        }
        return (
            <div>{text}</div>
        );
    }
}