import React from './../../lib/react';

var HomeButton = React.createClass ({
    render: function() {
        return (
            <div className="sm-col">
                <a href="#" className="btn py2">Home</a>
            </div>
        );
    }
});

export default HomeButton;