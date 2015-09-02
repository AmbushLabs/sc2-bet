package com.gosuwager

import com.gosuwager.bnet.SC2Character

class MainController {

    def index() { }

    def login() {
        if (!session.user_id || session.user_id == null) {
            redirect(url:'/');
            return;
        }
        def user = User.findById(session.user_id);
        println 'login session user id: ' + session.user_id;
        println 'bnetid: ' + user.battleNetAccount.battleNetId;
        println 'characterid: ' + user.battleNetAccount.characters.getAt(0).characterId;
        SC2Character sc2Char = user.battleNetAccount.characters.getAt(0);
        [
            logged_in: (user != null) ? true : false,
            character_name: sc2Char.displayName
        ]
    }
}
