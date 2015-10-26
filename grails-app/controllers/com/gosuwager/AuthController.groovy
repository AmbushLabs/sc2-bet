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

            if (account.user != null) {
                session.user_id = account.user.id;
            } else {
                //TODO: handle multiple characters, if thats a thing
                def character = battleNetApiService.getCharacterForToken(bnetToken);
                if (account.characters == null || account.characters.size() == 0) {
                    account.addToCharacters(character);
                }

                User u = new User();
                u.setBattleNetAccount(account);
                u.gosuCoins = 10;

                if (u.save(flush:true)) {
                    session.user_id = u.id;
                    println 'new user_id is ' + u.id;
                    println 'session user_id is ' + session.user_id;
                } else {
                    println account.errors
                }
            }
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
