package com.gosuwager

class GosuCoin {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;
    Integer tokenValue = 1;

    static hasMany = [
        wagerTokenTransactions:GosuCoinTransaction
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
