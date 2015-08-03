package com.gosuwager

class AuthController {

    BattleNetAuthService battleNetAuthService;
    BattleNetApiService battleNetApiService;

    def index() { }

    def bnet_start_auth() {
        redirect(url:battleNetAuthService.getAuthUrl());
    }

    def battlenet() {
        if (params.code) {
            def bnetToken = battleNetAuthService.getBattleNetAccessToken(params.code);
            def account = battleNetApiService.getAccountForToken(bnetToken);

            def oldToken = account.tokens.find { it.active == true };
            if (oldToken != null) {
                oldToken.active = false;
                oldToken.save();
            }
            account.addToTokens(bnetToken);

            def character = battleNetApiService.getCharacterForToken(bnetToken);
            println character;
            if (account.characters == null || account.characters.size() == 0) {
                println "adding character thing";
                account.addToCharacters(character);
            }
            println account.characters;

            account.save(flush:true);
            session.account_id = account.id;

            [
                loggedin:true
            ]
        } else {
            [
                loggedin:false
            ]
        }
    }
}
