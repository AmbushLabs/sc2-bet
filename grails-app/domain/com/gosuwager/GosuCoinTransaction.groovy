package com.gosuwager

class GosuCoinTransaction {

    private static final Date NULL_DATE = new Date(0);

    Date createDate = NULL_DATE;

    String transactionType = "game"; //game, withdrawl, purchase, gosu_empire_fee

    Integer coinAmount;
    Float bitCoinAmount;
    GosuCoinWithdrawlRequest withdrawlRequest;

    User owner;
    User originalOwner;
    Game game;
    StripeCharge stripeCharge;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }


    static constraints = {
        transactionType (nullable: false)
        coinAmount (nullable: false)
        owner (nullable: true)
        originalOwner (nullable: true)
        game (nullable: true)
        stripeCharge (nullable: true)
        bitCoinAmount (nullable: true)
        withdrawlRequest (nullable: true)
    }
}
