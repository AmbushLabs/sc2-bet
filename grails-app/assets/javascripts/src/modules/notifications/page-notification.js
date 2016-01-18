import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { CLEAR_NOTIFICATION } from './../../actions/actions';


export default class extends Component {

    render() {
        if (this.props.show) {
            const { dispatch } = this.props;
            setTimeout(() => {
                dispatch({
                    type: CLEAR_NOTIFICATION
                });
            }, 8000);
            return (
                <div className="page-notification col col-12 absolute bg-white border center p2 h5 animated fadeIn">
                    {this.props.text}
                </div>
            );
        }
        return (<div className="is_hidden"></div>);
    }


    componentDidUpdate() {
        $('html,body').animate({ scrollTop: 0 }, 'fast');
    }

}