package com.gosuwager

import com.gosuwager.bnet.SC2Character
import com.gosuwager.bnet.SC2Season

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
                def sc2Seasons = battleNetApiService.getCurrentAndPreviousSeasonForCharacter(character);
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
                        if (it.currentSeason == null) {
                            it.currentSeason = sc2Seasons.current_season;
                            if (it.currentSeason != null) {
                                it.currentSeason.save();
                            }
                        } else if (sc2Seasons.current_season != null) {
                            updateSeason(it.currentSeason, sc2Seasons.current_season);
                        }
                        if (it.previousSeason == null) {
                            it.previousSeason = sc2Seasons.previous_season;
                            if (it.previousSeason != null) {
                                it.previousSeason.save();
                            }
                        } else if (sc2Seasons.previous_season != null) {
                            updateSeason(it.previousSeason, sc2Seasons.previous_season);
                        }
                    }
                }
            } else {
                //TODO: handle multiple characters, if thats a thing
                def character = battleNetApiService.getCharacterForToken(bnetToken);
                def sc2Seasons = battleNetApiService.getCurrentAndPreviousSeasonForCharacter(character);
                println sc2Seasons;
                if (account.characters == null || account.characters.size() == 0) {
                    account.addToCharacters(character);
                    if (sc2Seasons.current_season != null && !sc2Seasons.current_season.save()) {
                        println sc2Seasons.current_season.errors;
                    }
                    if (sc2Seasons.previous_season != null && !sc2Seasons.previous_season.save()) {
                        println sc2Seasons.previous_season.errors;
                    }
                    character.currentSeason = sc2Seasons.current_season;
                    character.previousSeason = sc2Seasons.previous_season;
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

    def updateSeason(SC2Season copyTo, SC2Season copyFrom) {
        copyTo.ladderName = copyFrom.ladderName;
        copyTo.ladderId = copyFrom.ladderId;
        copyTo.division = copyFrom.division;
        copyTo.rank = copyFrom.rank;
        copyTo.league = copyFrom.league;
        copyTo.matchMakingQueue = copyFrom.matchMakingQueue;
        copyTo.wins = copyFrom.wins;
        copyTo.losses = copyFrom.losses;
        copyTo.showcase = copyFrom.showcase;
        copyTo.save();
    }
}
