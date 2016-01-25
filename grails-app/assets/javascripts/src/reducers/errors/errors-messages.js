import React from 'react';


const errors = {
    'not_enough_coins': {
        message: 'You don\'t have enough Gosu Coins.',
        component: 'BuyMoreCoins'
    },
    'game_gone': {
        message: 'That game is no longer available. Try a different game or refresh to get more games.'
    },
    'not_enough_coins_for_withdrawl': {
        message: 'You don\'t have enough Gosu Coins for that withdrawl.'
    },
    'card_exception': {
        message: 'There was a problem with your card. Please re-enter your information and try again!'
    },
    'stripe_rate_limit': {
        message: 'There was a problem with processing your card. Please try again.'
    },
    'stripe_invalid_request': {
        message: 'There was a problem with communicating with our payment processor. Please try again.'
    },
    'stripe_auth_invalid': {
        message: 'There was a problem with contacting our payment processor. Please try again.'
    },
    'stripe_network_failed': {
        message: 'There was a problem with contacting our payment processor. Please try again.'
    },
    'general_problem': {
        message: 'There was a problem.'
    }
};

const errorMessages = (message_key) => {
    return errors[message_key];
};

export default errorMessages;