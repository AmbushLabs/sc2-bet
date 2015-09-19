package com.gosuwager

class Game {
    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;
    Integer tokenWager;

    User creator;
    User challenger;

    Boolean active;
    Boolean challengerAccepted;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        tokenWager nullable: false;
        creator nullable: false;
        challenger nullable: true;
        active nullable: false;
        challengerAccepted nullable: false;
    }
}
