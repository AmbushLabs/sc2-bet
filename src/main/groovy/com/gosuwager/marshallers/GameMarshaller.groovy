package com.gosuwager.marshallers

import com.gosuwager.Game
import com.gosuwager.bnet.SC2Character
import grails.converters.JSON
import org.springframework.web.context.request.RequestContextHolder
import sun.misc.BASE64Encoder

import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

/**
 * Created by aaronhenshaw on 9/2/15.
 */
class GameMarshaller {

    void register() {

        JSON.registerObjectMarshaller(Game) { Game g ->
            def ret = [:]
            ret['id'] = g.id;
            ret['wager'] = g.gosuCoin;
            ret['created'] = g.createDate.getTime();
            ret['is_active'] = g.active;

            def session = RequestContextHolder.currentRequestAttributes().getSession()
            def isPlayer1 = (g.player1 && g.player1.id == session.user_id);
            def isPlayer2 = (g.player2 && g.player2.id == session.user_id);
            ret['has_player1'] = !(g.player1 == null);
            ret['has_player2'] = !(g.player2 == null);
            ret['is_player1'] = isPlayer1;
            ret['is_player2'] = isPlayer2;
            ret['is_joined'] = (isPlayer1 || isPlayer2);
            ret['has_player1_accepted'] = g.challengerAccepted;
            ret['rank'] = g.rank;
            ret['rank_display'] = Rank.rankToString(g.rank);

            ret['link'] = 'https://localhost:8443/w/' + g.id;

            Mac hmac = Mac.getInstance("HmacSHA1");
            hmac.init(new SecretKeySpec("LHZ,E=&VM4yC,rx.s,.P*-IGu]TQ".getBytes("UTF-8"), "HmacSHA1"));
            ret['upload_hash'] = (new BASE64Encoder()).encode(
                    hmac.doFinal(ret['link'].getBytes("UTF-8")))
                    .replaceAll("\n", "");

            if (g.player1) {
                def creatorCharacter = g.player1.battleNetAccount.characters.first();
                ret['player1'] = getCharacterMap(creatorCharacter);
            }

            if (g.player2) {
                def challengerCharacter = g.player2.battleNetAccount.characters.first();
                ret['player2'] = getCharacterMap(challengerCharacter);
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
