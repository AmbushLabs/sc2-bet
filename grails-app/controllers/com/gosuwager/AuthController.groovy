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
                def character = battleNetApiService.getCharacterForToken(bnetToken);
                account.characters.each {
                    if (it.characterId == character.characterId) {
                        it.avatarHeight = character.avatarHeight;
                        it.name = character.name;
                        it.displayName = character.displayName;
                        it.clanName = character.clanName;
                        it.clanTag = character.clanTag;
                        it.profilePath = character.profilePath;
                        it.portraitUrl = character.portraitUrl;
                        it.avatarUrl = character.avatarUrl;
                        it.primaryRace = character.primaryRace;
                        it.protossWins = character.protossWins;
                        it.terranWins = character.terranWins;
                        it.zergWins = character.zergWins;
                        it.highest1v1Rank = character.highest1v1Rank;
                        it.highestTeamRank = character.highestTeamRank;
                        it.seasonTotalGames = character.seasonTotalGames;
                        it.careerTotalGames = character.careerTotalGames;
                        it.save();
                    }
                }
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
                    gosuCoins: 0,
                    referralCode: referralCode,
                    isAdmin: false
                ]);

                if (usr.save(flush:true) && account.save(flush:true)) {
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
