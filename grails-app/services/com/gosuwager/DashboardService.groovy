package com.gosuwager

import grails.transaction.Transactional

@Transactional
class DashboardService {

    def grailsApplication;

    def GosuCoinService;
    def ReplayService;
    def GameService;

    def getInitializeData(u) {
        def ret = [:];
        ret['has_loaded'] = true;
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

            GameService.initializeGames();

            ret['games'] = [:];
            ret['games']['all'] = [:];
            def query = Game.where {
                completed == false && active == true && challengerAccepted == true && (player1 == u || player2 == u)
            }
            def ready = query.list(sort:"gosuCoin", order:"desc");
            def ready_count = query.count();

            def to_approve = Game.findAllByActiveAndPlayer1AndChallengerAcceptedAndCompletedAndPlayer2IsNotNull(true, u, false, false, [sort:"gosuCoin", order:"desc"]);
            def to_approve_count = Game.countByActiveAndPlayer1AndChallengerAcceptedAndCompletedAndPlayer2IsNotNull(true, u, false, false);

            def search = Game.findAllByActiveAndChallengerAcceptedAndIsPrivateAndCompletedAndPlayer2IsNull(true, false, false, false, [sort:"gosuCoin", order:"desc"]);
            def search_count = Game.countByActiveAndChallengerAcceptedAndIsPrivateAndCompletedAndPlayer2IsNull(true, false, false, false);

            def waitingQuery = Game.where {
                completed == false && active == true && isPrivate == false && ((player1 == u && player2 == null) || (player2 == u && challengerAccepted == false))
            }
            def waiting = waitingQuery.list(sort:"gosuCoin", order:"desc");
            //Game.findAllByActiveAndPlayer1AndIsPrivateAndPlayer2IsNull(true, u, false, [sort:"createDate", order:"desc"]);
            def waiting_count = waitingQuery.count();

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
            ret['config'] = [:];
            ret['config']['stripe_key'] = grailsApplication.config.getProperty('stripe.key');
            ret['config']['site_uri'] = grailsApplication.config.getProperty('site_uri');

        }
        return ret;
    }
}
