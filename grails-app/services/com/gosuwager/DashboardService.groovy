package com.gosuwager

import grails.transaction.Transactional
import org.springframework.web.context.request.RequestContextHolder

@Transactional
class DashboardService {

    def grailsApplication;

    def GosuCoinService;
    def ReplayService;
    def GameService;

    def getInitializeData(u) {
        def ret = [:];
        ret['has_loaded'] = true;

        def csrf = generateCsrf(u);

        def sesh = RequestContextHolder.currentRequestAttributes().getSession();
        sesh.csrf = csrf;
        ret['csrf'] = [:];
        ret['csrf']['value'] = csrf;
        ret['referral'] = [:];
        if (sesh.referral_code) {
            ret['referral']['code'] = sesh.referral_code;
        }

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
            def ready = query.list(sort:"gosuCoin", order:"asc");
            def ready_count = query.count();

            def to_approve = Game.findAllByActiveAndPlayer1AndChallengerAcceptedAndCompletedAndPlayer2IsNotNull(true, u, false, false, [sort:"gosuCoin", order:"asc"]);
            def to_approve_count = Game.countByActiveAndPlayer1AndChallengerAcceptedAndCompletedAndPlayer2IsNotNull(true, u, false, false);

            def search = Game.findAllByActiveAndChallengerAcceptedAndIsPrivateAndCompletedAndPlayer2IsNull(true, false, false, false, [sort:"gosuCoin", order:"asc"]);
            def search_count = Game.countByActiveAndChallengerAcceptedAndIsPrivateAndCompletedAndPlayer2IsNull(true, false, false, false);

            def awaitingChallenger = findGamesWithOnePlayerNearSkillLevel(u, u.battleNetAccount.getMostRecentRank(), true, true);
            def lengthOrTwo = awaitingChallenger.size() > 1 ? 1 : 0;
            def awaitingTrimmed = (awaitingChallenger.size() > 0) ? awaitingChallenger[0..lengthOrTwo] : awaitingChallenger;

            def waitingQuery = Game.where {
                completed == false && active == true && isPrivate == false && ((player1 == u && player2 == null) || (player2 == u && challengerAccepted == false))
            }
            def waiting = waitingQuery.list(sort:"gosuCoin", order:"asc");
            def waiting_count = waitingQuery.count();

            (ready + to_approve + search + waiting + awaitingTrimmed).each { g ->
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

            ret['games']['awaiting_challenger'] = [:]
            ret['games']['awaiting_challenger']['ids'] = awaitingTrimmed.collect { it.id };

            ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);

            ret['s3'] = ReplayService.s3PolicyAndSignature();
            ret['config'] = [:];
            ret['config']['stripe_key'] = grailsApplication.config.getProperty('stripe.key');
            ret['config']['site_uri'] = grailsApplication.config.getProperty('site_uri');

            ret['invitational'] = [:];
            ret['invitational']['joined'] = (TournamentSignUp.findByUserAndActive(u, true) != null);



        }
        return ret;
    }
    
    
    def findGamesWithOnePlayerNearSkillLevel(User u, Integer rank, Boolean allowDown, Boolean allowUp) {
        if (rank > 6 || rank <= 0) {
            return [];
        }
        def games = Game.findAllByActiveAndIsPrivateAndPlayer1NotEqualAndRankAndPlayer1IsNotNullAndPlayer2IsNull(true, false, u, rank, [sort:"gosuCoin", order: "asc", limit: 5]);
        if (games.size() > 2) {
            return games;
        }
        return games + (allowDown ? findGamesWithOnePlayerNearSkillLevel(u, --rank, true, false) : []) + (allowUp ? findGamesWithOnePlayerNearSkillLevel(u, ++rank, false, true) : []);
    }

    def generateCsrf(user) {
        String d = "" + (new Date()).getTime();
        Random r = new Random(999999);
        def nextInt = r.nextInt();
        if (user) {
            return String.format("%s-%s-%s-%s-%s", "" + user.id, "-fieah24r1h0r9i13tf0e", user.referralCode, d, "" + nextInt).toSHA1("IamThe-SHAZZZRzerrrrr~~~)@32hirt4^");
        } else {

            return String.format("%s-%s-%s", "-fDGW42y62e", d, "" + nextInt).toSHA1("IamThe-SHAZZZRzer!!rrrr~~~)@32hirt4^");
        }
    }
    
}
