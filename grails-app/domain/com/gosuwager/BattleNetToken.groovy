package com.gosuwager

class BattleNetToken {

    String accessToken;
    String scope;
    Long expiresIn;

    Boolean active;

    Date createDate;



    def beforeInsert() {
        if (createDate == null) {
            createDate = new Date();
        }
    }

    static constraints = {
    }
}
