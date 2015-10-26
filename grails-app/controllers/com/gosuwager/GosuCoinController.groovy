package com.gosuwager

import grails.converters.JSON

class GosuCoinController {

    def StripeService;
    def GosuCoinService;
    def NotificationMessageService;

    def purchase() {
        println params;
        def ret = [:]
        println session.user_id
        println request.method
        if (request.method == 'POST'
                && params.token_id
                && params.token_email
                && params.price
                && session.user_id) {
            println 'doing thing';
            def intPrice = Integer.valueOf(params.price);
            def numCoins = GosuCoinService.getNumGosuCoinsForPrice(intPrice);
            def user = User.findById(session.user_id);
            println user;
            def modifiedUser = StripeService.processPayment(
                params.token_id,
                params.token_email,
                intPrice,
                numCoins,
                user
            );

            ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(modifiedUser);
            ret['message'] = NotificationMessageService.getPurchasedGosuCoinsMessage(numCoins);
        }
        render ret as JSON;

    }
}
