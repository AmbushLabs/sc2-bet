package com.gosuwager

import java.security.SecureRandom

class AuthController {

    BattleNetAuthService battleNetAuthService;
    BattleNetApiService battleNetApiService;

    def GameService;
    def ReferralCodeService;

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
                    if (!character.save()) {
                        println character.errors;
                    }
                }
                String referralCode = '';
                while (referralCode == '' || User.findByReferralCode(referralCode)) {
                    referralCode = ReferralCodeService.randomAlphaNumericString();
                }

                def usr = new User([
                    battleNetAccount: account,
                    gosuCoins: 100,
                    referralCode: referralCode
                ]);

                if (usr.save(flush:true) && account.save(flush:true)) {
                    GameService.createPrivateGamesForUser(usr, [50, 100, 500, 1000]);
                    session.user_id = usr.id;

                } else {
                    println account.errors;
                    println usr.errors;
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
