package com.gosuwager

import grails.transaction.Transactional

@Transactional
class GosuCoinService {

    def canUserCreateOrJoinGame(User u, Game g) {
        def total = getTotalGosuCoins(u)?:0;
        def totalWagered = getWageredGosuCoins(u)?:0;
        def remainingCoins = total.intValue() - totalWagered.intValue();
        if (remainingCoins >= g.gosuCoin) {
            return true;
        }
        return false;
    }

    def getWageredGosuCoins(User u) {
        def query = Game.where {
            active == true && (player1 == u || player2 == u) && (challengerAccepted == true || isPrivate == false)
        }
        def created_or_joined = query.list();
        return created_or_joined.sum { g -> g.gosuCoin };
    }

    def getTotalGosuCoins(User u) {
        return u.gosuCoins;
    }

    def getGosuCoinReturnMap(User u) {
        def ret = [:];
        ret['wagered'] = (getWageredGosuCoins(u)?:0).intValue();
        ret['total'] = (getTotalGosuCoins(u)?:0).intValue();
        ret['total_value'] = ret['total']/100;
        ret['remaining'] = ret['total'] - ret['wagered'];
        ret['remaining_value'] = ret['remaining']/100;
        return ret;
    }

    def getNumGosuCoinsForPrice(price) {
        def coinOpts = getGosuCoinOptions();
        if (coinOpts.containsKey(price)) {
            return coinOpts[price];
        }
        return 0;
    }

    def getGosuCoinOptions() {
        //[price ==> coins]
        return [
            500: 500,
            1000: 1025,
            2000: 2060,
            5000: 5175
        ];
    }

}
