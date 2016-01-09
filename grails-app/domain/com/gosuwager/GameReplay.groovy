package com.gosuwager

class GameReplay {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;

    String replayName;
    String replayFullPath;
    String bucket;
    String etag;

    String fileSha1Hash;

    Game game;
    User user;

    Boolean processed = false;
    Boolean processing = false;
    Boolean isValidForGame = false;
    String errorReason; //start_time_before_accepted, invalid_players

    //post processed data
    Date gameStartTime;
    Date gameEndTime;
    String mapName;
    Integer numberOfPlayers;
    String player1Race;
    String player2Race;
    String player1Result;
    String player2Result;

    String player1Name;
    Integer player1BnetRegion;
    Integer player1BnetSubRegion;
    Integer player1Uid;

    String player2Name;
    Integer player2BnetRegion;
    Integer player2BnetSubRegion;
    Integer player2Uid;




    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }


    static constraints = {
        replayName nullable: false
        replayFullPath nullable: false
        bucket nullable: false
        etag nullable: false
        fileSha1Hash nullable: true
        game nullable: false
        user nullable: true
        processed nullable: false
        processing nullable: false
        isValidForGame nullable: false
        createDate nullable: false

        gameStartTime nullable: true
        gameEndTime nullable: true
        mapName nullable: true
        numberOfPlayers nullable: true
        player1Race nullable: true
        player2Race nullable: true
        player1Result nullable: true
        player2Result nullable: true

        player1Name nullable: true
        player1BnetRegion nullable: true
        player1BnetSubRegion nullable: true
        player1Uid nullable: true

        player2Name nullable: true
        player2BnetRegion nullable: true
        player2BnetSubRegion nullable: true
        player2Uid nullable: true

        errorReason nullable: true
    }
}
