package com.gosuwager

import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import com.gosuwager.bnet.SC2Character
import com.gosuwager.bnet.SC2Season
import grails.transaction.Transactional
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method
import org.grails.web.json.JSONElement

@Transactional
class BattleNetApiService {

    def grailsApplication;

    def getAccountForToken(BattleNetToken bnetToken) {
        BattleNetAccount bnetAccount = null;
        def http = new HTTPBuilder('https://us.api.battle.net/account/user');
        http.request(Method.GET, ContentType.URLENC) {
            uri.query = [
                access_token: bnetToken.accessToken
            ]
            headers.'User-Agent' = "GosuWager 0.1"
            headers.Accept = 'application/json'

            response.success = { resp, reader ->
                JsonElement jelement = new JsonParser().parse(reader.keySet()[0]);
                JsonObject jobject = jelement.getAsJsonObject();

                def bnetId = new BigInteger(jobject.get('id').getAsString());
                bnetAccount = BattleNetAccount.findByBattleNetId(bnetId);
                if (bnetAccount == null) {
                    bnetAccount = new BattleNetAccount();
                    bnetAccount.battleNetId = bnetId;
                    def tmp = jobject.get('battletag');
                    if (tmp != null && !tmp.isJsonNull()) {
                        bnetAccount.battleTag = tmp.getAsString();
                    }
                    bnetAccount.save();
                }
            }
        }

        return bnetAccount;
    }

    def getCharacterForToken(BattleNetToken bnetToken) {
        def character = new SC2Character();
        def http = new HTTPBuilder('https://us.api.battle.net/sc2/profile/user');
        http.request(Method.GET, ContentType.URLENC) {
            uri.query = [
                access_token: bnetToken.accessToken
            ]
            headers.'User-Agent' = "GosuEmpire 0.1"
            headers.Accept = 'application/json'

            response.success = { resp, reader ->
                JsonElement jelement = new JsonParser().parse(reader.keySet()[0]);
                JsonObject jobject = jelement.getAsJsonObject();

                JsonArray characters = jobject.getAsJsonArray('characters')
                characters.each { JsonElement je ->
                    def charJson = je.getAsJsonObject();
                    character.characterId = charJson.get('id').getAsLong();
                    character.realm = charJson.get('realm').getAsInt();
                    character.name = charJson.get('name').getAsString();
                    character.displayName = charJson.get('displayName').getAsString();
                    character.clanName = charJson.get('clanName').getAsString();
                    character.clanTag = charJson.get('clanTag').getAsString();
                    character.profilePath = charJson.get('profilePath').getAsString();

                    def portrait = charJson.getAsJsonObject('portrait');
                    character.portraitUrl = portrait.get('url').getAsString();
                    character.portraitHeight = portrait.get('h').getAsInt();
                    character.portraitWidth = portrait.get('w').getAsInt();
                    character.portraitX = portrait.get('x').getAsInt();
                    character.portraitY = portrait.get('y').getAsInt();
                    character.portraitOffset = portrait.get('offset').getAsInt();

                    def avatar = charJson.getAsJsonObject('avatar');
                    character.avatarUrl = avatar.get('url').getAsString();
                    character.avatarHeight = avatar.get('h').getAsInt();
                    character.avatarWidth = avatar.get('w').getAsInt();
                    character.avatarX = avatar.get('x').getAsInt();
                    character.avatarY = avatar.get('y').getAsInt();
                    character.avatarOffset = avatar.get('offset').getAsInt();

                    def career = charJson.getAsJsonObject('career');
                    character.primaryRace = career.get('primaryRace').getAsString();
                    character.protossWins = career.get('protossWins').getAsInt();
                    character.terranWins = career.get('terranWins').getAsInt();
                    character.zergWins = career.get('zergWins').getAsInt();
                    if (career.has('highest1v1Rank') && career.get('highest1v1Rank') != null) {
                        character.highest1v1Rank = career.get('highest1v1Rank').getAsString();
                    }
                    if (career.has('highestTeamRank') && career.get('highestTeamRank') != null) {
                        character.highestTeamRank = career.get('highestTeamRank').getAsString();
                    }
                    character.seasonTotalGames = career.get('seasonTotalGames').getAsInt();
                    character.careerTotalGames = career.get('careerTotalGames').getAsInt();

                    character.save();
                }
            }

        }

        return character;
    }

    def getCurrentAndPreviousSeasonForCharacter(SC2Character sc2Character) {
        def ret = [:];
        ret['current_season'] = null;
        ret['previous_season'] = null;
        def bnetKey = grailsApplication.config.getProperty('battlenet.key');
        def urlString = String.format("https://us.api.battle.net/sc2/profile/%s/%s/%s/ladders", sc2Character.getCharacterId().toString(), sc2Character.getRealm().toString(), sc2Character.getDisplayName());
        def http = new HTTPBuilder(urlString);
        http.request(Method.GET, ContentType.URLENC) {
            uri.query = [
                apikey: bnetKey,
                locale: 'en_US'
            ]
            headers.'User-Agent' = "GosuEmpire 0.1"
            headers.Accept = 'application/json'

            response.success = { resp, reader ->
                JsonElement jelement = new JsonParser().parse(reader.keySet()[0]);
                JsonObject jobject = jelement.getAsJsonObject();
                JsonArray currentSeasonInfo = jobject.getAsJsonArray('currentSeason');
                currentSeasonInfo.each { JsonElement je ->
                    JsonArray theseLadders = je.getAsJsonArray('ladder');
                    def tmp = getSoloSeasonFromLadderSet(theseLadders);
                    if (tmp != null) {
                        ret['current_season'] = tmp;
                    }
                }
                JsonArray previousSeasonInfo = jobject.getAsJsonArray('previousSeason');
                previousSeasonInfo.each { JsonElement je ->
                    JsonArray otherLadders = je.getAsJsonArray('ladder');
                    def tmp = getSoloSeasonFromLadderSet(otherLadders);
                    if (tmp != null) {
                        ret['previous_season'] = tmp;
                    }
                }
            }
        }
        return ret;
    }

    def getSoloSeasonFromLadderSet(JsonArray theseLadders) {
        def sc2season = null;
        theseLadders.each { JsonElement tl ->
            def thisLadder = tl.getAsJsonObject();
            def matchmakingType = thisLadder.get('matchMakingQueue').getAsString();
            if (matchmakingType.toLowerCase().contains("solo")) {
                sc2season = new SC2Season([
                    ladderName: thisLadder.get('ladderName').getAsString(),
                    ladderId: thisLadder.get('ladderId').getAsInt(),
                    division: thisLadder.get('division').getAsInt(),
                    rank: thisLadder.get('rank').getAsInt(),
                    league: thisLadder.get('league').getAsString(),
                    matchMakingQueue: thisLadder.get('matchMakingQueue').getAsString(),
                    wins: thisLadder.get('wins').getAsInt(),
                    losses: thisLadder.get('losses').getAsInt(),
                    showcase: thisLadder.get('showcase').getAsBoolean()
                ]);
            }
        }
        return sc2season;
    }
}
