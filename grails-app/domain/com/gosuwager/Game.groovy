package com.gosuwager

class Game {

    Date createDate;

    def beforeInsert() {
        if (createDate == null) {
            createDate = new Date();
        }
    }

    static constraints = {
    }
}
