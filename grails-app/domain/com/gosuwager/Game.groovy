package com.gosuwager

class Game {
    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;
    Integer gosuCoin;

    User player1;
    User player2;

    Boolean active = true;
    Boolean challengerAccepted = false;

    Boolean completed = false;

    String winner = null; //player1, player2

    Boolean isPrivate = false;

    /*
        1 - Master
        2 - Diamond
        3 - Platinum
        4 - Gold
        5 - Silver
        6 - Bronze
     */
    Integer rank;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        gosuCoin nullable: false;
        active nullable: false;
        challengerAccepted nullable: false;
        completed nullable: false;
        isPrivate nullable: false;

        player1 nullable: true;
        player2 nullable: true;
        winner nullable: true;
        rank nullable: true;
    }
}
