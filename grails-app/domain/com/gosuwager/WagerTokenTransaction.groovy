package com.gosuwager

class WagerTokenTransaction {

    Date createDate;

    User originalOwner;
    User newOwner;
    Game relatedGame;

    def beforeInsert() {
        if (createDate == null) {
            createDate = new Date();
        }
    }


    static constraints = {
    }
}
