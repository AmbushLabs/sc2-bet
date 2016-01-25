package com.gosuwager.bnet

class SC2Season {

    String ladderName;
    Integer ladderId;
    Integer division;
    Integer rank;
    String league;
    String matchMakingQueue;
    Integer wins;
    Integer losses;
    Boolean showcase;

    static constraints = {
        ladderName nullable: false;
        ladderId nullable: false;
        division nullable: false;
        rank nullable: false;
        league nullable: false;
        matchMakingQueue nullable: false;
        wins nullable: false;
        losses nullable: false;
        showcase nullable: false;
    }
}
