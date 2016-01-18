import React from 'react';


const errors = {
    'not_enough_coins': {
        message: 'You don\'t have enough Gosu Coins.',
        component: 'BuyMoreCoins'
    },
    'game_gone': {
        message: 'That game is no longer available. Try a different game or refresh to get more games.'
    }
};

const errorMessages = (message_key) => {
    return errors[message_key];
};

export default errorMessages;