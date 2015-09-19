package com.gosuwager

import com.gosuwager.bnet.SC2Character

class MainController {

    def index() {
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
}
