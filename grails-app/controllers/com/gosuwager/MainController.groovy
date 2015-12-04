package com.gosuwager

import com.gosuwager.bnet.SC2Character
import grails.converters.JSON

class MainController {

    def DashboardService;

    def index() {
        //session.user_id = 2;
        def user = User.findById(session.user_id?:0);
        def characterName = '';
        if (user) {
            SC2Character sc2Char = user.battleNetAccount.characters.getAt(0);
            characterName = sc2Char.displayName;
        }
        [
                logged_in: (user != null) ? true : false,
                character_name: characterName
        ]
    }

    def initialize() {
        //session.user_id = 2;
        User u = User.findById(session.user_id);
        def ret = DashboardService.getInitializeData(u);
        render ret as JSON;
    }
}
