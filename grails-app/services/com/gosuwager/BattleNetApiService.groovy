package com.gosuwager

import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import com.gosuwager.bnet.SC2Character
import grails.transaction.Transactional
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method

@Transactional
class BattleNetApiService {

    def getAccountForToken(BattleNetToken bnetToken) {
        BattleNetAccount bnetAccount = null;
        def http = new HTTPBuilder('https://us.api.battle.net/account/user');
        println bnetToken.accessToken;
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

        //println 'https://us.api.battle.net/sc2/profile/user?access_token=' + bnetToken.accessToken;
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

                    //def random = Random.newInstance();
                    //def rNum = random.nextInt(50);
                    character.displayName = character.displayName;// + rNum;


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
                    character.highest1v1Rank = career.get('highest1v1Rank').getAsString();
                    character.highestTeamRank = career.get('highestTeamRank').getAsString();
                    character.seasonTotalGames = career.get('seasonTotalGames').getAsInt();
                    character.careerTotalGames = career.get('careerTotalGames').getAsInt();

                    character.save();
                }
            }

        }

        return character;
    }
}
