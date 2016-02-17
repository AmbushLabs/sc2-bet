import React from 'react';
import ButtonBase from './button-base';
//import { accept } from './../../../api/game/crud';

const Leave = ({dispatch, gameId, loading, colClass, csrf}) => {
    return (
        <ButtonBase
            buttonClass={"green col " + colClass}
            buttonText="Chat and Start Playing!"
            dispatch={dispatch}
            gameId={gameId}
            loading={loading}
            csrf={csrf}
            />
    )
};

export default Leave;