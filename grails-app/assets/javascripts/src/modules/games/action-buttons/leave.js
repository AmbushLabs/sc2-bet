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
            iconVal={"tiny-symbol ss-icons ss-skullandcrossbones"}
            />
    )
};

export default Leave;