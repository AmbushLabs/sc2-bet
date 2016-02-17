import React from 'react';
import ButtonBase from './button-base';
import { SHOW_SHARE_GAME_MODAL } from './../../../actions/actions';

const Join = ({dispatch, gameId, colClass, csrf}) => {
    return (
        <ButtonBase
            buttonClass={"blue col " + colClass}
            buttonText="Share"
            dispatch={dispatch}
            crudAction={(gid) => {
                return {
                    type: SHOW_SHARE_GAME_MODAL,
                    data: {
                        gameId: gid
                    }
                }
            }}
            gameId={gameId}
            iconVal={"tiny-symbol ss-icons ss-share"}
            csrf={csrf}
            />
    )
};

export default Join;