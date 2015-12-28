import React from 'react';

import FullUser from './../user/full-user'

export default ({user, dashboard}) => {
    return (
        <FullUser
            user={user.character}
            userId={user.id}
            referral={user.referral}
            dashboard={dashboard}
            />
    );
};