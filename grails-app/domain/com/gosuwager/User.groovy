package com.gosuwager

class User {

    private static final Date NULL_DATE = new Date(0);

    Date createDate = NULL_DATE;

    Integer gosuCoins = 1;
    Integer contestWins = 0;
    Integer contestLosses = 0;

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
        contestWins nullable: false;
        contestLosses nullable: false;
        createDate nullable: false;
        battleNetAccount nullable: false;
        emails nullable: true;
        gosuCoins nullable: false;
    }
}
