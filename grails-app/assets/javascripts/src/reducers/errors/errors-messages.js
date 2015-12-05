import React from 'react';


const errors = {
    'not_enough_coins': {
        message: 'You don\'t have enough Gosu Coins.',
        component: 'BuyMoreCoins'
    }
};

const errorMessages = (message_key) => {
    return errors[message_key];
};

export default errorMessages;