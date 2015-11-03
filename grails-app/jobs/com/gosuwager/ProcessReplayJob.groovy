package com.gosuwager

import net.sf.json.JSONObject

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
                    if (ReplayService.updateReplayFromJSONReplay(jgd, replayToProcess)) {
                        println "processed and updated successfully";
                        println "updating game and winner details"
                        ReplayService.updateGameFromReplay(replayToProcess);
                    }
                } catch (Exception ex) {
                    println ex;
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
