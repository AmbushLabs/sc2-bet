import React from 'react';
import ButtonBase from './button-base';
import { leave } from './../../../api/game/crud';

const Leave = ({dispatch, gameId, loading, colClass}) => {
    return (
        <ButtonBase
            buttonClass={"orange col " + colClass}
            buttonText="Leave"
            dispatch={dispatch}
            crudAction={leave}
            gameId={gameId}
            loading={loading}
            />
    )
};

export default Leave;