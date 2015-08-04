package com.gosuwager

class User {

    Date createDate;

    static hasOne = [
        battleNetAccount:BattleNetAccount
    ];

    static hasMany = [
        wagerTokens:WagerTokens
    ];

    def beforeInsert() {
        if (createDate == null) {
            createDate = new Date();
        }
    }

    static constraints = {
    }
}
