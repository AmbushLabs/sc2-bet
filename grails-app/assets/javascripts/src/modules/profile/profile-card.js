import React from 'react';

import FullUser from './../user/full-user'

export default ({user}) => {
    return (
        <FullUser
            user={user.character}
            userId={user.id}
            />
    );
};