package com.gosuwager

class User {

    private static final Date NULL_DATE = new Date(0);

    Date createDate = NULL_DATE;

    Integer gosuCoins = 1;
    Integer contestWins = 0;
    Integer contestLosses = 0;

    String referralCode;
    Integer referralUses = 0;

    String referralCodeUsed;
    String referralCodeUsedType;

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
        referralCode nullable: false;
        referralUses nullable: false;

        referralCodeUsed nullable: true;
        referralCodeUsedType nullable: true;
    }
}
