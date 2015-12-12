import React from 'react';

var HomeButton = React.createClass ({
    render: function() {
        return (
            <div className="sm-col white">
                <a href="/#" className="btn py2">
                    <img src="https://s3-us-west-2.amazonaws.com/gosuempire/assets/logo.png" className="gosu-empire-logo-header left" />
                    <div className="left ml1">Gosu Empire</div>
                </a>
            </div>
        );
    }
});

export default HomeButton;