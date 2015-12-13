import React from 'react';
import ButtonBase from './button-base';
import { reject } from './../../../api/game/crud';

const Leave = ({dispatch, gameId, loading, colClass}) => {
    return (
        <ButtonBase
            buttonClass={"red col " + colClass}
            buttonText="Reject"
            dispatch={dispatch}
            crudAction={reject}
            gameId={gameId}
            loading={loading}
            iconVal={"tiny-symbol ss-icons p1 ss-ban"}
            />
    )
};

export default Leave;