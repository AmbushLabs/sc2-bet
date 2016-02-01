package com.gosuwager

import com.gosuwager.bnet.SC2Character
import com.gosuwager.marshallers.Rank

class BattleNetAccount {

    private static final Date NULL_DATE = new Date(0)

    BigInteger battleNetId;
    String battleTag;
    Date createDate = NULL_DATE;


    def getMostRecentRank() {
        if (characters && characters.size() > 0) {
            def character = characters.first();
            if (character.currentSeason != null && character.currentSeason.league != null) {
                return Rank.rankToInteger(character.currentSeason.league);
            } else if (character.previousSeason != null && character.previousSeason.league != null) {
                return Rank.rankToInteger(character.previousSeason.league);
            } else if (character.highest1v1Rank && character.highest1v1Rank != '') {
                return Rank.rankToInteger(character.highest1v1Rank);
            }
        }
        return 0;
    }


    static belongsTo = [user:User]

    static hasMany = [
        tokens:BattleNetToken,
        characters:SC2Character
    ];

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        createDate nullable: false;
        battleNetId nullable: false;
        battleTag nullable: true;
        token: nullable: false;
        characters: nullable: false;
        user nullable: false;
    }
}
