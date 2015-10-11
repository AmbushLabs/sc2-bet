import React, { Component } from 'react';

export default class UserImage extends Component {

    render() {
        return (
            <img className="circle" src={this.props.img_src} />
        );
    }

}