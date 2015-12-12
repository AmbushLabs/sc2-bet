package com.gosuwager

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
                        if (1==0 && d.getTime() < replayToProcess.game.challengerAcceptedDate.getTime()) {
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

                    } else {
                        println replayToProcess.errors;
                    }
                } catch (Exception ex) {
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
