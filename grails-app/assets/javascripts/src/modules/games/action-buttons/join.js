import React from 'react';
import ButtonBase from './button-base';
import { join } from './../../../api/game/crud';

const Join = ({dispatch, gameId, loading, colClass}) => {
    return (
        <ButtonBase
            buttonClass={"blue col " + colClass}
            buttonText="Join Contest"
            dispatch={dispatch}
            crudAction={join}
            gameId={gameId}
            loading={loading}
            />
    )
};

export default Join;