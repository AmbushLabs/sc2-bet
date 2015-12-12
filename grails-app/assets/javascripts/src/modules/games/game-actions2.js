import React from 'react';

import JoinButton from './action-buttons/join';
import ShareButton from './action-buttons/share';
import LeaveButton from './action-buttons/leave';
import AcceptButton from './action-buttons/accept';
import RejectButton from './action-buttons/reject';
import JoinChatButton from './action-buttons/join-chat';


const GameActions = ({game, dispatch}) => {

    if (!game.is_active) {

    }

    if (game.has_player1 && game.has_player2) {
        if (game.has_player1_accepted) {
            //play time!
            return (
                <div className="col col-12">

                </div>
            );
        } else if (game.is_player1) {
            return (
                <div className="col col-12">
                    <div className="col col-4 px1">
                        <AcceptButton
                            dispatch={dispatch}
                            gameId={game.id}
                            loading={game.is_accepting}
                            colClass="col-12 h6"
                            />
                    </div>
                    <div className="col col-4 px1">
                        <RejectButton
                            dispatch={dispatch}
                            gameId={game.id}
                            loading={game.is_rejecting}
                            colClass="col-12 h6"
                            />
                    </div>
                    <div className="col col-4 px1">
                        <LeaveButton
                            dispatch={dispatch}
                            gameId={game.id}
                            loading={game.is_leaving}
                            colClass="col-12 h6"
                            />
                    </div>
                </div>
            );
        } else if (game.is_player2) {
            console.log('is player 2 leave button');
            //show either: 1) waiting on player1 OR 2) leave game
            return (
                <div className="col col-12">
                    <LeaveButton
                        dispatch={dispatch}
                        gameId={game.id}
                        loading={game.is_leaving}
                        colClass="col-12"
                        />
                </div>
            );
        } else {
            console.log('no controls');
            //no controls
        }
    }

    if ((game.has_player1 && !game.is_player1 && !game.has_player2)
        || (!game.has_player1 && !game.has_player2)){
        //show join
        return (
            <JoinButton
                dispatch={dispatch}
                gameId={game.id}
                loading={game.is_joining}
                colClass="col-12"
                />
        );
    }

    if (game.has_player1 && game.is_player1 && !game.has_player2) {
        return (
            <div className="col col-12">
                <div className="col col-5">
                    <ShareButton
                        dispatch={dispatch}
                        gameId={game.id}
                        loading={false}
                        colClass="col-12"
                        />
                </div>
                <div className="col col-2">&nbsp;</div>
                <div className="col col-5">
                    <LeaveButton
                        dispatch={dispatch}
                        gameId={game.id}
                        loading={game.is_joining}
                        colClass="col-12"
                        />
                </div>
            </div>
        );
    }

    return (<div>&nbsp;</div>);
};

export default GameActions;