package com.gosuwager

class User {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;

    Integer gosuCoins = 1;

    static hasOne = [
        battleNetAccount:BattleNetAccount
    ];

    static hasMany = [
        emails:Email
    ];


    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        gosuCoins (nullable: false);
    }
}
