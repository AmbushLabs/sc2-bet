package com.gosuwager

class WagerTokens {

    Date createDate;

    static hasMany = [
        wagerTokenTransactions:WagerTokenTransaction
    ];

    def beforeInsert() {
        if (createDate == null) {
            createDate = new Date();
        }
    }

    static constraints = {
    }
}
