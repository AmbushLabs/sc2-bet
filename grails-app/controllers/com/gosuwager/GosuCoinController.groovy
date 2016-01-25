package com.gosuwager

import grails.converters.JSON

class GosuCoinController {

    def StripeService;
    def GosuCoinService;
    def NotificationMessageService;
    def BitCoinService;
    def SendEmailService;

    def purchase() {
        def ret = [:]
        println session.user_id
        println request.method
        if (request.method == 'POST'
                && params.token_id
                && params.token_email
                && params.price
                && session.user_id) {
            def intPrice = Integer.valueOf(params.price);
            def numCoins = GosuCoinService.getNumGosuCoinsForPrice(intPrice);
            def user = User.findById(session.user_id);
            def stripeRet = StripeService.processPayment(
                params.token_id,
                params.token_email,
                intPrice,
                numCoins,
                user
            );
            if (stripeRet.success) {
            def modifiedUser = stripeRet.user;
                ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(modifiedUser);
                ret['message'] = NotificationMessageService.getPurchasedGosuCoinsMessage(numCoins);
                ret['success'] = true;
            } else {
                ret['success'] = false;
                ret['error'] = true;
                ret['error_reason'] = stripeRet.error_reason;
            }
        }
        render ret as JSON;

    }

    def bitCoinRate() {
        def ret = [:];
        ret['bit_coin'] = BitCoinService.getCurrentPriceUSD();
        render ret as JSON;
    }


    def withdrawlRequest() {
        def ret = [:];
        ret['withdrawls'] = [:];
        ret['success'] = false;
        if (request.method == 'POST' && params.gosu_coin_withdrawl_amount && params.bit_coin_wallet_id) {
            User u = User.findById(session.user_id);
            Integer amount = Integer.valueOf(params.gosu_coin_withdrawl_amount);
            def gosuCoins = GosuCoinService.getGosuCoinReturnMap(u);
            def bitCoinRate = BitCoinService.getCurrentPriceUSD();
            if (amount <= gosuCoins.remaining) {
                GosuCoinWithdrawlRequest gcwr = new GosuCoinWithdrawlRequest([
                    user: u,
                    amount: -Math.abs(amount),
                    bitCoinRate: Float.valueOf(bitCoinRate.rate),
                    processed: false,
                    bitCoinWalletId: params.bit_coin_wallet_id
                ]);
                if (gcwr.save(flush:true)) {
                    u.gosuCoins -= amount;
                    if (u.save()) {
                        //cool
                        SendEmailService.send(u, 'gosu-coin-withdrawl-requested', [gosu_coin_amount:amount]);
                        ret['success'] = true;
                    } else {
                        println u.errors;
                    }
                } else {
                    println gcwr.errors;
                }
            } else {
                ret['error'] = true;
                ret['error_reason'] = 'not_enough_coins_for_withdrawl';
            }
            ret['withdrawls']['pending'] = GosuCoinWithdrawlRequest.findAllByUserAndProcessed(u, false);
            ret['withdrawls']['completed'] = GosuCoinWithdrawlRequest.findAllByUserAndProcessed(u, true);
            ret['withdrawls']['bit_coin'] = bitCoinRate;
            ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);


        } else if (request.method == 'GET') {

        }
        render ret as JSON;
    }

    def withdrawlsList() {
        def ret = [:];
        ret['withdrawls'] = [:];
        User u = User.findById(session.user_id);
        if (u) {
            ret['withdrawls']['bit_coin'] = BitCoinService.getCurrentPriceUSD();
            ret['withdrawls']['pending'] = GosuCoinWithdrawlRequest.findAllByUserAndProcessed(u, false);
            ret['withdrawls']['completed'] = GosuCoinWithdrawlRequest.findAllByUserAndProcessed(u, true);
        }

        render ret as JSON;
    }



}
