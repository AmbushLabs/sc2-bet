package com.gosuwager

import com.gosuwager.bnet.SC2Character

class MainController {

    def index() { }

    def login() {
        def bnetAccount = BattleNetAccount.findById(session.account_id);
        println bnetAccount.characters;
        SC2Character sc2Char = bnetAccount.characters.getAt(0);
        [
            logged_in: (bnetAccount != null) ? true : false,
            character_name: sc2Char.displayName
        ]
    }
}
