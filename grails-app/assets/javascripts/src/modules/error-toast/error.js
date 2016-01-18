import React, { Component } from 'react';
import { CLEAR_ERRORS } from './../../actions/actions';
import ReactDOM from 'react-dom';

export default class extends Component {
    render() {
        const { errors, dispatch } = this.props;

        var displayClass = "is_hidden";
        var errorMessage = '';
        if (errors && errors.length > 0) {
            displayClass = "animated fadeIn"; //fadeInDown
            const error = errors[0];
            errorMessage = error.errorDetail.message;
            setTimeout(function() {
                dispatch({
                    type: CLEAR_ERRORS
                })
            }, 4000);
        }

        return (
            <section className={"col col-12 absolute is_error border center p2 h5 " + displayClass}>
                {errorMessage}
            </section>
        );
    }

    componentDidUpdate() {
        $('html,body').animate({ scrollTop: 0 }, 'fast');
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { errors } = this.props;
        return errors.length != nextProps.errors.length;
    }

};