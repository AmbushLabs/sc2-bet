package com.gosuwager

import grails.transaction.Transactional

@Transactional
class DashboardService {

    def GosuCoinService;
    def ReplayService;
    def GameService;

    def getInitializeData(User u) {
        def ret = [:];
        if (u == null) {
            ret['logged_in'] = false;
        } else {
            ret['logged_in'] = true;
            if (u.emails.size() > 0 && u.emails.find { it.isActive && it.isPrimary } != null) {
                ret['has_email'] = true;
            } else {
                ret['has_email'] = false;
            }
            ret['user'] = u;

            GameService.createPrivateGamesForUser(u, [10, 50, 100, 500, 1000])
            GameService.initializeGames();

            ret['games'] = [:];
            ret['games']['all'] = [:];
            def query = Game.where {
                active == true && challengerAccepted == true && (player1 == u || player2 == u)
            }
            def ready = query.list(sort:"createDate", order:"desc");
            def ready_count = query.count();

            def to_approve = Game.findAllByActiveAndPlayer1AndChallengerAcceptedAndPlayer2IsNotNull(true, u, false, [sort:"createDate", order:"desc"]);
            def to_approve_count = Game.countByActiveAndPlayer1AndChallengerAcceptedAndPlayer2IsNotNull(true, u, false);

            def search = Game.findAllByActiveAndChallengerAcceptedAndIsPrivateAndPlayer2IsNull(true, false, false, [sort:"createDate", order:"desc"]);
            def search_count = Game.countByActiveAndChallengerAcceptedAndIsPrivateAndPlayer2IsNull(true, false, false);

            def waiting = Game.findAllByActiveAndPlayer1AndIsPrivateAndPlayer2IsNull(true, u, false, [sort:"createDate", order:"desc"]);
            def waiting_count = Game.countByActiveAndPlayer1AndIsPrivateAndPlayer2IsNull(true, u, false);

            (ready + to_approve + search + waiting).each { g ->
                ret['games']['all'][g.id] = g;
            }

            ret['games']['ready'] = [:]
            ret['games']['ready']['ids'] = ready.collect { it.id };
            ret['games']['ready']['count'] = ready_count;

            ret['games']['waiting'] = [:];
            ret['games']['waiting']['ids'] = waiting.collect { it.id };
            ret['games']['waiting']['count'] = waiting_count;

            ret['games']['to_approve'] = [:]
            ret['games']['to_approve']['ids'] = to_approve.collect { it.id };
            ret['games']['to_approve']['count'] = to_approve_count;

            ret['games']['search'] = [:]
            ret['games']['search']['ids'] = search.collect { it.id };
            ret['games']['search']['count'] = search_count;
            ret['games']['selected_rank'] = 4;

            ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);

            ret['s3'] = ReplayService.s3PolicyAndSignature();
        }
        return ret;
    }
}
