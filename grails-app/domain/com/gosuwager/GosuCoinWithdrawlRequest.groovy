package com.gosuwager

class GosuCoinWithdrawlRequest {

    private static final Date NULL_DATE = new Date(0)

    User user;
    Integer amount;
    Float bitCoinRate;
    String bitCoinWalletId;
    Date createDate = NULL_DATE;
    Date processedDate = NULL_DATE;
    Boolean processed = false;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }


    static constraints = {
        user nullabe: false;
        amount nullable: false;
        bitCoinWalletId nullable: false;
        createDate nullable: false;
        processedDate nullable: false;
        processed nullable: false;
        bitCoinRate nullable: false;
    }
}
