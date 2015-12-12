import React from 'react';

export default ({game, replay}) => {

    return (
        <div className="col col-12">
            <div className="col col-12 gosu-blue-bg white p1">
                <div className="col col-6">
                    <span className="h3 ss-icon ss-check"></span>
                    <span className="h2">&nbsp;Replay Uploaded!</span>
                </div>
                <div className="col col-6">
                    <div className="h6 gray">MAP NAME</div>
                    <div className="h5">{replay.map_name}</div>
                </div>
            </div>
        </div>
    );
};