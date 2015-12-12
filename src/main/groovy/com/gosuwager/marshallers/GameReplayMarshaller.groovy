package com.gosuwager.marshallers

import com.gosuwager.GameReplay
import grails.converters.JSON
/**
 * Created by aaronhenshaw on 9/2/15.
 */
class GameReplayMarshaller {

    void register() {

        JSON.registerObjectMarshaller(GameReplay) { GameReplay gr ->
            def ret = [:]
            ret['uploaded'] = true;
            ret['valid'] = gr.isValidForGame;
            ret['processed'] = gr.processed;
            ret['processing'] = gr.processing;

            ret['error_reason'] = gr.errorReason;

            ret['map_name'] = gr.mapName;
            ret['player_1_race'] = gr.player1Race;
            ret['player_1_name'] = gr.player1Name;
            ret['player_1_result'] = gr.player1Result;
            ret['player_2_race'] = gr.player2Race;
            ret['player_2_name'] = gr.player2Name;
            ret['player_2_result'] = gr.player2Result;

            //def session = RequestContextHolder.currentRequestAttributes().getSession()



            return ret;
        }
    }

}
