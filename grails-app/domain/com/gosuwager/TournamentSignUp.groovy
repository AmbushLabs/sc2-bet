package com.gosuwager

class TournamentSignUp {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;
    User user;
    Boolean active;
    String tournamentName;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        createDate nullable: false;
        user nullable: false;
        active nullable: false;
        tournamentName nullable: false;
    }
}
