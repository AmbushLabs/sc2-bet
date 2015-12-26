package com.gosuwager

import grails.util.Holders
import org.grails.web.json.JSONObject


class ProcessReplayJob {

    def ReplayService;

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

                println "got object from s3"
                println "running python script";

                try {
                    JSONObject jgd = ReplayService.getJsonFromReplayFile(localFile);
                    //first check the thing.
                    Date d = new Date(jgd.getLong("start_time"));
                    if (ReplayService.updateReplayFromJSONReplay(jgd, replayToProcess)) {
                        replayToProcess.processed = true;
                        replayToProcess.processing = false;
                        println "processed and updated successfully";
                        if (Holders.config.getProperty('replayTimeCheckEnabled') && d.getTime() < replayToProcess.game.challengerAcceptedDate.getTime()) {
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
                        if (g.winner == 'player1') {
                            g.player1.gosuCoins += g.gosuCoin;
                            g.player2.gosuCoins -= g.gosuCoin;
                        } else if (replayToProcess.game.winner == 'player2') {
                            g.player2.gosuCoins += g.gosuCoin;
                            g.player1.gosuCoins -= g.gosuCoin;
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
            println 'no replays to process';
        }
    }

}
