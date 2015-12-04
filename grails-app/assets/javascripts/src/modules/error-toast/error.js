import React from 'react';

const ErrorToast = ({ errors, dispatch }) => {
    var displayClass = "is_hidden";
    if (errors && errors.length > 0) {
        displayClass = "animated fadeIn"; //fadeInDown
    }
    return (
        <section className={"col col-12 absolute is_error border center p2 h5 " + displayClass}>
            I am an error. Look at me!
        </section>
    );
};

export default ErrorToast;