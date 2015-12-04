import React from 'react';

const ButtonBase = ({buttonText, buttonClass, dispatch, crudAction, gameId, loading}) => {
    if (loading) {
        return (
            <button className={"btn btn-outline " + buttonClass}>
                <div className="loader">&nbsp;</div>
            </button>
        );
    }
    return (
        <button
            className={"btn btn-outline " + buttonClass}
            onClick={() => dispatch(crudAction(gameId))}
            >
            {buttonText}
        </button>
    );
};

export default ButtonBase;