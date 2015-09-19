package com.gosuwager.marshallers

import com.gosuwager.Game
import com.gosuwager.bnet.SC2Character
import grails.converters.JSON
import org.springframework.web.context.request.RequestContextHolder

/**
 * Created by aaronhenshaw on 9/2/15.
 */
class GameMarshaller {

    void register() {

        JSON.registerObjectMarshaller(Game) { Game g ->
            def ret = [:]
            ret['id'] = g.id;
            ret['wager'] = g.tokenWager;
            ret['created'] = g.createDate.getTime();
            ret['is_active'] = g.active;

            def session = RequestContextHolder.currentRequestAttributes().getSession()
            ret['is_creator'] = (g.creator.id == session.user_id);
            ret['is_challenger'] = false;
            ret['has_challenger'] = !(g.challenger == null);
            ret['has_creator_accepted'] = g.challengerAccepted;

            def creatorCharacter = g.creator.battleNetAccount.characters.first();
            ret['creator'] = getCharacterMap(creatorCharacter);

            if (g.challenger) {
                def challengerCharacter = g.challenger.battleNetAccount.characters.first();
                ret['challenger'] = getCharacterMap(challengerCharacter);
                ret['is_challenger'] = (g.challenger.id == session.user_id);
            }

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
        mp['highest_team_rank'] = character.highestTeamRank;
        mp['season_total_games'] = character.seasonTotalGames;
        mp['career_total_games'] = character.careerTotalGames;
        return mp;
    }

}
