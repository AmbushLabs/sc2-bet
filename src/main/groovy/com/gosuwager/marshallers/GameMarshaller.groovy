package com.gosuwager.marshallers

import com.gosuwager.Game
import grails.converters.JSON

/**
 * Created by aaronhenshaw on 9/2/15.
 */
class GameMarshaller {

    void register() {

        JSON.registerObjectMarshaller(Game) { Game g ->
            def ret = [:]
            ret['wager'] = g.tokenWager;
            ret['created'] = g.createDate.getTime();


            def character = g.creator.battleNetAccount.characters.first();
            ret['creator'] = [:];
            ret['creator']['realm'] = character.realm;
            ret['creator']['name'] = character.name;
            ret['creator']['display_name'] = character.displayName;
            ret['creator']['clan_name'] = character.clanName;
            ret['creator']['clan_tag'] = character.clanTag;
            ret['creator']['portrait_url'] = character.portraitUrl;
            ret['creator']['avatar_url'] = character.avatarUrl;
            ret['creator']['primary_race'] = character.primaryRace;
            ret['creator']['protoss_wins'] = character.protossWins;
            ret['creator']['terran_wins'] = character.terranWins;
            ret['creator']['zerg_wins'] = character.zergWins;
            ret['creator']['highest_1v1_rank'] = character.highest1v1Rank;
            ret['creator']['highest_team_rank'] = character.highestTeamRank;
            ret['creator']['season_total_games'] = character.seasonTotalGames;
            ret['creator']['career_total_games'] = character.careerTotalGames;



            return ret;
        }

    }

}
