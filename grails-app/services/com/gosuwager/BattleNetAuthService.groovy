package com.gosuwager

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import grails.transaction.Transactional
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method

@Transactional
class BattleNetAuthService {

    def getAuthUrl() {
        return 'https://us.battle.net/oauth/authorize' +
                '?client_id=' + grailsApplication.config.getProperty('battlenet.key') + '&' +
                'scope=sc2.profile&' +
                'redirect_uri=' + URLEncoder.encode(grailsApplication.config.getProperty('battlenet.redirect_uri'), "UTF-8") + '&' +
                'response_type=code';
    }

    def getBattleNetAccessToken(String code) {
        def bnetToken = new BattleNetToken();
        def http = new HTTPBuilder('https://us.battle.net/oauth/token');
        http.request(Method.POST, ContentType.URLENC) {
            uri.query = [
                    redirect_uri: grailsApplication.config.getProperty('battlenet.redirect_uri'),
                    scope: 'sc2.profile',
                    grant_type: 'authorization_code',
                    code: code,
                    client_id: grailsApplication.config.getProperty('battlenet.key'),
                    client_secret: grailsApplication.config.getProperty('battlenet.secret')
            ];

            headers.'User-Agent' = "GosuWager 0.1"
            headers.Accept = 'application/json'

            response.success = { resp, reader ->
                JsonElement jelement = new JsonParser().parse(reader.keySet()[0]);
                JsonObject  jobject = jelement.getAsJsonObject();
                bnetToken.accessToken = jobject.get('access_token').getAsString();
                bnetToken.scope = jobject.get('scope').getAsString();
                bnetToken.expiresIn = jobject.get('expires_in').getAsLong();
                bnetToken.save();
            }
        }
        return bnetToken;
    }
}
