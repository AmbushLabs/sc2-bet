import React from 'react';

export default ({battleNetTag}) => {

    return (
        <div className="col col-12">
            <div className="col col-0 lg-col-2">&nbsp;</div>
            <div className="col col-12 lg-col-8 gosu-light-blue-bg gosu-blue-text border p2 mb3 mt2 center">
                <div className="col col-12">
                    <div className="h3">Contact your opponent</div>
                    <div className="h4">You can contact your opponent over Battle.net using their battle tag: <span className="bold">{battleNetTag}</span></div>
                </div>
            </div>
            <div className="col col-0 lg-col-2">&nbsp;</div>
        </div>
    );
};