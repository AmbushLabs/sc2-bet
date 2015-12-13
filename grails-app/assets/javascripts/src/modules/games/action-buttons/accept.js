import React from 'react';
import ButtonBase from './button-base';
import { accept } from './../../../api/game/crud';

const Leave = ({dispatch, gameId, loading, colClass}) => {
    return (
        <ButtonBase
            buttonClass={"green col " + colClass}
            buttonText="Accept"
            dispatch={dispatch}
            crudAction={accept}
            gameId={gameId}
            loading={loading}
            iconVal={"tiny-symbol ss-icons p1 ss-check"}
            />
    )
};

export default Leave;