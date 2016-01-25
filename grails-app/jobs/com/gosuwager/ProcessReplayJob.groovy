package com.gosuwager

import grails.util.Holders
import org.grails.web.json.JSONObject


class ProcessReplayJob {

    final Float GOSU_EMPIRE_TAKE = 0.15;

    def ReplayService;
    def GosuCoinService;
    def SendEmailService;

    static triggers = {
      simple repeatInterval: 15000l // execute job once in 5 seconds
    }

    def execute() {
        GameReplay replayToProcess = GameReplay.findByProcessedAndProcessing(false, false);
        if (replayToProcess != null) {
            //process here
            replayToProcess.processing = true;
            if (replayToProcess.save(flush:true)) {
                println 'processing replay... ' + replayToProcess.id;

                println "hitting up s3 for replay"

                def localFile = "/gosuempire/replays/" + replayToProcess.replayName;
                ReplayService.downloadReplayFromS3ToLocal(localFile, replayToProcess);


                try {
                    JSONObject jgd = ReplayService.getJsonFromReplayFile(localFile);
                    String fileHash = ReplayService.getFileHash(localFile);
                    def newHashValid = true;
                    if (fileHash != null && fileHash != "") {
                        def grcheck = GameReplay.findByFileSha1Hash(fileHash);
                        if (grcheck != null) {
                            newHashValid = false;
                        }
                    }
                    //first check the thing.
                    Date d = new Date(jgd.getLong("start_time"));
                    if (ReplayService.updateReplayFromJSONReplay(jgd, replayToProcess)) {
                        replayToProcess.processed = true;
                        replayToProcess.processing = false;
                        replayToProcess.fileSha1Hash = fileHash;
                        println "processed and updated successfully";
                        def hashes = ReplayService.getUniqueGameHashes(
                                replayToProcess.player1Uid,
                                replayToProcess.player2Uid,
                                replayToProcess.mapName,
                                replayToProcess.gameStartTime
                        );
                        replayToProcess.identifierHash1 = hashes["1"];
                        replayToProcess.identifierHash2 = hashes["2"];
                        if (GameReplay.findByIdentifierHash1(hashes["1"]) != null || GameReplay.findByIdentifierHash1(hashes["2"]) != null) {
                            newHashValid = false;
                        }

                        if (!newHashValid) {
                            //invalid...
                            println 'invalid because already uploaded this replay'
                            replayToProcess.isValidForGame = false;
                            replayToProcess.errorReason = 'replay_exists';
                        } else if (Holders.config.getProperty('replayTimeCheckEnabled') && d.getTime() < replayToProcess.game.challengerAcceptedDate.getTime()) {
                            //invalid...
                            println 'invalid because of time'
                            replayToProcess.isValidForGame = false;
                            replayToProcess.errorReason = 'start_time_before_accepted';
                        } else {
                            def isTwoPlayers = replayToProcess.numberOfPlayers == 2;
                            def validPlayers = ReplayService.arePlayersValid(replayToProcess);
                            if (!isTwoPlayers) {
                                println "invalid number of players";
                                replayToProcess.isValidForGame = false;
                                replayToProcess.errorReason = 'invalid_player_number';
                            } else if (!validPlayers) {
                                println "invalid players";
                                replayToProcess.isValidForGame = false;
                                replayToProcess.errorReason = 'invalid_players';
                            } else {
                                println "updating game and winner details";
                                replayToProcess.isValidForGame = true;
                                ReplayService.updateGameFromReplay(replayToProcess);
                            }
                        }

                    }

                    if (replayToProcess.save()) {
                        //lets update the players now?
                        def g = replayToProcess.game;
                        //take time
                        Integer gEmpireTake = Math.floor(GOSU_EMPIRE_TAKE*g.gosuCoin).intValue();
                        def winnerTake = g.gosuCoin - gEmpireTake;

                        if (g.winner == 'player1') {
                            g.player1.gosuCoins += winnerTake;
                            g.player2.gosuCoins -= g.gosuCoin;
                            GosuCoinService.createGosuCoinTransaction(-g.gosuCoin, 'game', null, g.player2, g);
                            GosuCoinService.createGosuCoinTransaction(winnerTake, 'game', g.player1, g.player2, g);
                            GosuCoinService.createGosuCoinTransaction(gEmpireTake, 'gosu_empire_fee', null, g.player2, g);
                            SendEmailService.send(g.player1, 'challenge-won', [gosu_coin_amount: winnerTake]);
                        } else if (replayToProcess.game.winner == 'player2') {
                            g.player2.gosuCoins += winnerTake;
                            g.player1.gosuCoins -= g.gosuCoin;
                            GosuCoinService.createGosuCoinTransaction(-g.gosuCoin, 'game', null, g.player1, g);
                            GosuCoinService.createGosuCoinTransaction(winnerTake, 'game', g.player2, g.player1, g);
                            GosuCoinService.createGosuCoinTransaction(gEmpireTake, 'gosu_empire_fee', null, g.player1, g);
                            SendEmailService.send(g.player2, 'challenge-won', [gosu_coin_amount: winnerTake]);
                        }
                        if (g.player1.save() && g.player2.save()) {

                        } else {
                            println g.player1.errors;
                            println g.player2.errors;
                        }
                    } else {
                        println replayToProcess.errors;
                    }
                } catch (Exception ex) {
                    replayToProcess.isValidForGame = false;
                    replayToProcess.errorReason = 'exception';
                    replayToProcess.processing = false;
                    replayToProcess.processed = true;
                    replayToProcess.save();
                    println ex;
                    ex.printStackTrace();
                }
                println 'processed ' + replayToProcess.replayFullPath;
            } else {
                println replayToProcess.errors;
            }
        } else {

        }
    }

}
