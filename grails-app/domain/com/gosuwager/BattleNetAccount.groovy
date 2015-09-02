package com.gosuwager

import com.gosuwager.bnet.SC2Character

class BattleNetAccount {

    private static final Date NULL_DATE = new Date(0)

    BigInteger battleNetId;
    String battleTag;
    Date createDate = NULL_DATE;

    static belongsTo = [user:User]

    static hasMany = [
        tokens:BattleNetToken,
        characters:SC2Character
    ];

    def beforeInsert() {
        println 'beforeInsert';
        if (createDate == NULL_DATE) {
            println 'beforeInsert: setting date';
            createDate = new Date();
        }
    }

    static constraints = {
        createDate nullable:false;
    }
}
