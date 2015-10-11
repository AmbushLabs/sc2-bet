import React, { Component, PropTypes } from 'react';

export default class ActionButton extends Component {

    constructor(options) {
        super(options);
        this.getTextOrLoader = this.getTextOrLoader.bind(this);
    }

    render() {
        if (this.props.is_disabled) {
            return (
                <button className={this.props.className}>
                    {this.props.buttonText}
                </button>
            );
        }
        return (
            <button
                className={this.props.className}
                onClick={this.props.onClick}>
                {this.getTextOrLoader()}
            </button>
        );
    }

    getTextOrLoader() {
        if (this.props.is_fetching) {
            return (
                <div className="loader">&nbsp;</div>
            );
        }
        return (
            <div>{this.props.buttonText}</div>
        );
    }
}