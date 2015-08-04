package com.gosuwager

import com.gosuwager.bnet.SC2Character

class BattleNetAccount {

    BigInteger battleNetId;
    String battleTag;
    Date createDate;

    static belongsTo = [user:User]

    static hasMany = [
        tokens:BattleNetToken,
        characters:SC2Character
    ];

    def beforeInsert() {
        if (createDate == null) {
            createDate = new Date();
        }
    }

    static constraints = {
    }
}
