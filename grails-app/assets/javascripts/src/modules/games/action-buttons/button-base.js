import React from 'react';

const ButtonBase = ({buttonText, buttonClass, dispatch, crudAction, gameId, loading, iconVal}) => {
    if (loading) {
        return (
            <button className={"btn btn-outline " + buttonClass}>
                <div className="spinner">&nbsp;</div>
            </button>
        );
    }
    return (
        <button
            className={"btn btn-outline " + buttonClass}
            onClick={() => dispatch(crudAction(gameId))}
            >
            <span className={iconVal}></span>&nbsp;
            {buttonText}
        </button>
    );
};

export default ButtonBase;