import React from 'react';
import { CHECK_EMAIL_ADDRESS } from './../../actions/actions';

export default () => {
    return (dispatch) => {
        return fetch('/user/hasEmail', {credentials:'include'})
            .then(response => response.json())
            .then(json =>
                dispatch({
                    type: CHECK_EMAIL_ADDRESS,
                    status: 'success',
                    data: json
                })
        );
    }
};

