package com.gosuwager.marshallers

import com.gosuwager.User
import com.gosuwager.bnet.SC2Character
import grails.converters.JSON

/**
 * Created by aaronhenshaw on 9/2/15.
 */
class UserMarshaller {

    void register() {

        JSON.registerObjectMarshaller(User) { User u ->
            def ret = [:]
            ret['id'] = u.id;

            def activePrimaryEmail = u.emails.find { it.isActive && it.isPrimary };
            if (activePrimaryEmail) {
                ret['email'] = activePrimaryEmail.email;
            }

            ret['wins'] = 4;
            ret['losses'] = 1;
            ret['character'] = getCharacterMap(u.battleNetAccount.characters.first());
            return ret;
        }
    }

    def getCharacterMap(SC2Character character) {
        def mp = [:];
        mp['realm'] = character.realm;
        mp['name'] = character.name;
        mp['display_name'] = character.displayName;
        mp['clan_name'] = character.clanName;
        mp['clan_tag'] = character.clanTag;
        mp['portrait_url'] = character.portraitUrl;
        mp['avatar_url'] = character.avatarUrl;
        mp['primary_race'] = character.primaryRace;
        mp['protoss_wins'] = character.protossWins;
        mp['terran_wins'] = character.terranWins;
        mp['zerg_wins'] = character.zergWins;
        mp['highest_1v1_rank'] = character.highest1v1Rank;
        mp['highest_1v1_rank_int'] = Rank.rankToInteger(character.highest1v1Rank);
        mp['highest_team_rank'] = character.highestTeamRank;
        mp['season_total_games'] = character.seasonTotalGames;
        mp['career_total_games'] = character.careerTotalGames;
        mp['a'] = character.characterId;
        if (character.primaryRace.toLowerCase().equals("protoss")) {
            mp['primary_race_wins'] = character.protossWins;
        } else if (character.primaryRace.toLowerCase().equals("terran")) {
            mp['primary_race_wins'] = character.terranWins;
        } else {
            mp['primary_race_wins'] = character.zergWins;
        }
        return mp;
    }

}
