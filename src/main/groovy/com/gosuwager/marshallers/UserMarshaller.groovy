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

            ret['referral'] = u.referralCode;
            ret['is_admin'] = u.isAdmin;
            ret['wins'] = u.contestWins;
            ret['losses'] = u.contestLosses;
            ret['character'] = getCharacterMap(u.battleNetAccount.characters.first());
            ret['created'] = u.createDate.getTime();
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

        if (character.currentSeason) {
            mp['current_1v1_rank'] = character.currentSeason.league;
            mp['current_1v1_rank_int'] = Rank.rankToInteger(character.currentSeason.league);
            mp['current_1v1_wins'] = character.currentSeason.wins;
            mp['current_1v1_losses'] = character.currentSeason.losses;
        }

        if (character.previousSeason) {
            mp['previous_1v1_rank'] = character.previousSeason.league;
            mp['previous_1v1_rank_int'] = Rank.rankToInteger(character.previousSeason.league);
            mp['previous_1v1_wins'] = character.previousSeason.wins;
            mp['previous_1v1_losses'] = character.previousSeason.losses;
        }

        mp['season_total_games'] = character.seasonTotalGames;
        mp['career_total_games'] = character.careerTotalGames;
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
