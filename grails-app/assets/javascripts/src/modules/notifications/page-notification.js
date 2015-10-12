import React, { Component, PropTypes } from 'react';
import { CLEAR_NOTIFICATION } from './../../actions/actions';


export default class PageNotification extends Component {

    render() {
        if (this.props.show) {
            const { dispatch } = this.props;
            setTimeout(() => {
                dispatch({
                    type: CLEAR_NOTIFICATION
                });
            }, 3000);
            return (
                <div className="fixed top-0 left-0 right-0 p2 white bg-green">
                    {this.props.text}
                </div>
            );
        }
        return (<div></div>);
    }
}