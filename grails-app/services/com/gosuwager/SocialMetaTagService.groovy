package com.gosuwager

import com.gosuwager.bnet.SC2Character
import grails.transaction.Transactional

import java.util.regex.Matcher
import java.util.regex.Pattern

@Transactional
class SocialMetaTagService {

    def grailsApplication;

    def getPageDataForUri(requestUri) {
        def ret = [:];
        ret['ogImage'] = "https://s3-us-west-2.amazonaws.com/gosuempire/assets/logo-blue-bg-lg.png";

        String sanitized = requestUri.toLowerCase().trim();

        ret['ogUrl'] = getUrlForRequestURI(sanitized);

        if (sanitized.startsWith("/w/")) {
            /*
            Pattern p = Pattern.compile("\\d+");
            Matcher m = p.matcher(sanitized);
            if (m.find()) {
                def gameId = Integer.valueOf(m.group());
                Game g = Game.findById(gameId);

            }
            */
            ret['ogTitle'] = "Join this contest and win!";
        } else if (sanitized.startsWith("/p/")) {
            Pattern p = Pattern.compile("\\d+");
            Matcher m = p.matcher(sanitized);
            if (m.find()) {
                def userId = Integer.valueOf(m.group());
                User u = User.findById(userId);
                if (u.battleNetAccount && u.battleNetAccount.characters.size() > 0) {
                    SC2Character sc2Char = u.battleNetAccount.characters.first();
                    ret['ogImage'] = sc2Char.avatarUrl;
                    ret['ogTitle'] = sc2Char.displayName + '\'s Profile';
                }
            }
        } else {
            ret['ogTitle'] = 'Start winning on GosuEmpire now!';
        }
        println ret;
        return ret;
    }

    def getUrlForRequestURI(requestUri) {
        return grailsApplication.config.site_uri_no_slash + requestUri;
    }
}
