import React from 'react';
import ButtonBase from './button-base';
import { accept } from './../../../api/game/crud';

const Accept = ({dispatch, gameId, loading, colClass, csrf}) => {
    return (
        <ButtonBase
            buttonClass={"green col " + colClass}
            buttonText="Accept"
            dispatch={dispatch}
            crudAction={accept}
            gameId={gameId}
            loading={loading}
            iconVal={"tiny-symbol ss-icons ss-check"}
            csrf={csrf}
            />
    )
};

export default Accept;