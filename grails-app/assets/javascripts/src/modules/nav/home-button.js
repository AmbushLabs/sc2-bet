import React from './../../lib/react';

var HomeButton = React.createClass ({
    render: function() {
        return (
            <div className="sm-col border-right bg-darken-1">
                <a href="#" className="btn py2">Dashboard</a>
            </div>
        );
    }
});

export default HomeButton;