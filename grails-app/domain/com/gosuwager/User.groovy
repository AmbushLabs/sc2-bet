package com.gosuwager

class User {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;

    static hasOne = [
        battleNetAccount:BattleNetAccount
    ];

    static hasMany = [
        wagerTokens:WagerToken
    ];

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
    }
}
