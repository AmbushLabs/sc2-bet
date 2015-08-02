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

    def getCharacterForToken(BattleNetToken bnetToken) {
        def character = new SC2Character();
        def http = new HTTPBuilder('https://us.api.battle.net/sc2/profile/user');
        http.request(Method.GET, ContentType.URLENC) {
            uri.query = [
                    access_token: bnetToken.accessToken
            ]
            headers.'User-Agent' = "GosuWager 0.1"
            headers.Accept = 'application/json'

            response.success = { resp, reader ->
                JsonElement jelement = new JsonParser().parse(reader.keySet()[0]);
                JsonObject jobject = jelement.getAsJsonObject();

                JsonArray characters = jobject.getAsJsonArray('characters')
                characters.each { JsonElement je ->
                    def charJson = je.getAsJsonObject();
                    println charJson.get('displayName');
                }
            }

        }

        return character;
    }
}
