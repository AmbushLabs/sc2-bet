package com.gosuwager

import grails.transaction.Transactional

@Transactional
class GosuCoinService {

    def canUserCreateOrJoinGame(User u, Game g) {
        def total = getTotalGosuCoins(u)?:0;
        def totalWagered = getWageredGosuCoins(u)?:0;
        def remainingCoins = total.intValue() - totalWagered.intValue();
        if (remainingCoins >= g.tokenWager) {
            return true;
        }
        return false;
    }

    def getWageredGosuCoins(User u) {
        def query = Game.where {
            active == true && (creator == u || challenger == u)
        }
        def created_or_joined = query.list();
        return created_or_joined.sum { g -> g.tokenWager };
    }

    def getTotalGosuCoins(User u) {
        return u.wagerTokens.sum {
            it.tokenValue
        }
    }

    def getGosuCoinReturnMap(User u) {
        def ret = [:];
        ret['wagered'] = (getWageredGosuCoins(u)?:0).intValue();
        ret['total'] = (getTotalGosuCoins(u)?:0).intValue();
        ret['remaining'] = ret['total'] - ret['wagered'];
        return ret;
    }

}
