import React from 'react';
import moment from 'moment';

export default ({ user, gray }) => {
    const dateStr = moment(user.created).format("M/D/YYYY H:mm");

    return (
        <div className={"col col-12" + (gray ? " bg-darken-1 " : " bg-white") }>
            <div className="col col-1">
                {user.id}
            </div>
            <div className="col col-3">
                {user.email}<br />
                {dateStr}
            </div>
            <div className="col col-3">
                {user.character.display_name}
            </div>
            <div className="col col-3">
                {user.character.name}
            </div>
            <div className="col col-2">
                {user.character.primary_race}
            </div>
        </div>
    );
}
