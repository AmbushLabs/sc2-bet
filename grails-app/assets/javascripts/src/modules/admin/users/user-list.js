import React from 'react';

import UserListItem from './user-list-item';


export default ({ users, dispatch }) => {
    var userListNodes = users.map((user, index) => {
        return (
            <UserListItem
                user={user}
                dispatch={dispatch}
                gray={index%2}
                />
        );
    });
    return (
        <div className="col col-12">
            {userListNodes}
        </div>
    );
}