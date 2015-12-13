import React from 'react';
import ButtonBase from './button-base';
import { join } from './../../../api/game/crud';

const Join = ({dispatch, gameId, loading, colClass}) => {
    return (
        <ButtonBase
            buttonClass={"blue col " + colClass}
            buttonText="Click to Join"
            dispatch={dispatch}
            crudAction={join}
            gameId={gameId}
            loading={loading}
            iconVal={"tiny-symbol ss-icons p1 ss-target"}
            />
    )
};

export default Join;