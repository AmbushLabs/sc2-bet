import React from 'react';
import ButtonBase from './button-base';
import { reject } from './../../../api/game/crud';

const Leave = ({dispatch, gameId, loading, colClass, csrf}) => {
    return (
        <ButtonBase
            buttonClass={"red col " + colClass}
            buttonText="Reject"
            dispatch={dispatch}
            crudAction={reject}
            gameId={gameId}
            loading={loading}
            iconVal={"tiny-symbol ss-icons ss-ban"}
            csrf={csrf}
            />
    )
};

export default Leave;