import React from 'react';

var HomeButton = React.createClass ({
    render: function() {
        return (
            <div className="col col-12 sm-col-6 white">
                <a href="/#" className="btn py1 h3">
                    <img src="https://s3-us-west-2.amazonaws.com/gosuempire/assets/logo.png" className="gosu-empire-logo-header left" />
                    <div className="left ml1 py0 text-header">GosuEmpire</div>
                </a>
            </div>
        );
    }
});

export default HomeButton;