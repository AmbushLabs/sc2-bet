package com.gosuwager

import grails.transaction.Transactional

@Transactional
class GameService {

    /*
        1.  Users coming to the site should see a few games available for their
            skill level.
            a. games should be only visible if they need a player1 or a player2
            b. should be a few different values per skill level
                i. 10 GC
                ii. 50 GC
                iii. 100 GC
                iv. 500 GC
                v. 1000 GC
            c. *should higher skill levels have higher $$?
        2.  Users should have a few private games of the same amounts
        3.
     */

    def initializeGames() {
        createGamesForGosuCoins([50, 100, 500, 1000]);
        //createGamesForRankAndGosuCoins(2, [50, 100, 500, 1000]);
        //createGamesForRankAndGosuCoins(3, [50, 100, 500, 1000]);
        //createGamesForRankAndGosuCoins(4, [50, 100, 500, 1000]);
        //createGamesForRankAndGosuCoins(5, [50, 100, 500, 1000]);
        //createGamesForRankAndGosuCoins(6, [50, 100, 500, 1000]);
    }

    def createGamesForGosuCoins(gosuCoinAmounts) {
        def currentGames = Game.findAllByActiveAndIsPrivateAndPlayer2IsNullAndRankIsNull(true, false);
        def currentGameAmounts = currentGames.collect { it.gosuCoin };
        def remaining = gosuCoinAmounts - currentGameAmounts;
        remaining.each { amt ->
            Game g = new Game([
                gosuCoin: amt
            ]);
            if (!g.save()) {
                println g.errors;
            }
        }
    }

    def createGamesForRankAndGosuCoins(Integer rank, gosuCoinAmounts) {
        def currentGames = Game.findAllByRankAndActiveAndIsPrivateAndPlayer2IsNull(rank, true, false);
        def currentGameAmounts = currentGames.collect { it.gosuCoin };

        def remaining = gosuCoinAmounts - currentGameAmounts;

        remaining.each { amt ->
            Game g = new Game([
                gosuCoin: amt,
                rank: rank
            ]);
            if (!g.save()) {
                println g.errors;
            }
        }
    }

    def replacePublicGame(Game g) {
        if (g.player1 && g.player2 && g.challengerAccepted) {
            Game newG = new Game([
                gosuCoin: g.gosuCoin,
                rank: g.rank
            ]);
            if (!newG.save()) {
                println newG.errors;
            }
        }
    }

    def createPrivateGamesForUser(User u, gosuCoinAmounts) {
        def games = Game.findAllByPlayer1AndChallengerAcceptedAndIsPrivate(u, false, true);
        def currentGamesCoins = games.collect {
            it.gosuCoin
        };
        def toCreate = gosuCoinAmounts - currentGamesCoins;
        toCreate.each { amt ->
            Game g = new Game([
                gosuCoin: amt,
                rank: getRankInteger(u.battleNetAccount.characters.first().highest1v1Rank),
                player1: u,
                isPrivate: true
            ]);
            if (!g.save()) {
                println g.errors;
            }
        }
    }

    def getRankInteger(rank) {
        switch(rank.toLowerCase().trim()) {
            case 'master':
                return 1;
            case 'diamond':
                return 2;
            case 'platinum':
                return 3;
            case 'gold':
                return 4;
            case 'silver':
                return 5;
            case 'bronze':
                return 6;
        }
    }
}
