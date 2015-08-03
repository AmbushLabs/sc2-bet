package com.gosuwager

import com.gosuwager.bnet.SC2Character

class BattleNetAccount {

    BigInteger battleNetId;
    String battleTag;

    static hasMany = [
        tokens:BattleNetToken,
        characters:SC2Character
    ];

    static constraints = {
    }
}
