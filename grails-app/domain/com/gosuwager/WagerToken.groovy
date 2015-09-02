package com.gosuwager

class WagerToken {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;
    Integer tokenValue = 1;

    static hasMany = [
        wagerTokenTransactions:WagerTokenTransaction
    ];

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        wagerTokenTransactions nullable: true;
    }
}
