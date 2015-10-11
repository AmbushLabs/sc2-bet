import React, { Component } from 'react';

export default class UserImage extends Component {

    render() {
        if (this.props.img_src) {
            return (
                <img className="circle" src={this.props.img_src} />
            );
        } else {
            return (
                <div className="circle"></div>
            );
        }
    }

}