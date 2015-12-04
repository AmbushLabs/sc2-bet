package com.gosuwager

class BattleNetToken {

    private static final Date NULL_DATE = new Date(0)

    String accessToken;
    String scope;
    Long expiresIn;

    Boolean active;

    Date createDate = NULL_DATE;



    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        createDate nullable: false;
        accessToken nullable: false;
        scope nullable: false;
        expiresIn nullable: false;
        active nullable: false;
    }
}
