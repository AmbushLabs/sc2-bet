package com.gosuwager

import com.gosuwager.bnet.SC2Character
import grails.converters.JSON

class MainController {

    def DashboardService;
    def SocialMetaTagService;

    def index() {
        //session.user_id = 1;
        def user = User.findById(session.user_id?:0);
        def characterName = '';
        if (user) {
            SC2Character sc2Char = user.battleNetAccount.characters.getAt(0);
            characterName = sc2Char.displayName;
        }

        if (params.referral_code && params.referral_code != '') {
            session.referral_code = params.referral_code;
        } else {
            session.referral_code = null;
        }

        def csrf = DashboardService.generateCsrf(user);
        session.csrf = csrf;

        def pageData = SocialMetaTagService.getPageDataForUri(request.requestURI);
        [
            logged_in: (user != null) ? true : false,
            character_name: characterName,
            ogUrl: pageData.ogUrl,
            ogTitle: pageData.ogTitle,
            ogImage: pageData.ogImage,
            csrf: csrf
        ]
    }

    def initialize() {
        //session.user_id = 2;
        User u = User.findById(session.user_id);
        def ret = DashboardService.getInitializeData(u);
        render ret as JSON;
    }

}
