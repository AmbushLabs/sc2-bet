package com.gosuwager.bnet

class SC2Character {

    Long characterId;
    Integer realm;
    String name;
    String displayName;
    String clanName;
    String clanTag;
    String profilePath;

    String portraitUrl;
    Integer portraitHeight;
    Integer portraitWidth;
    Integer portraitX;
    Integer portraitY;
    Integer portraitOffset;

    String avatarUrl;
    Integer avatarHeight;
    Integer avatarWidth;
    Integer avatarX;
    Integer avatarY;
    Integer avatarOffset;

    String primaryRace;
    Integer protossWins;
    Integer terranWins;
    Integer zergWins;
    String highest1v1Rank;
    String highestTeamRank;
    Integer seasonTotalGames;
    Integer careerTotalGames;

    static constraints = {
        characterId nullable: false;
        realm nullable: false;
        name nullable: false;
        displayName nullable: false;
        clanName nullable: true;
        clanTag nullable: true;
        profilePath nullable: false;

        portraitUrl nullable: false;
        portraitHeight nullable: false;
        portraitWidth nullable: false;
        portraitX nullable: false;
        portraitY nullable: false;
        portraitOffset nullable: false;

        avatarUrl nullable: false;
        avatarHeight nullable: false;
        avatarWidth nullable: false;
        avatarX nullable: false;
        avatarY nullable: false;
        avatarOffset nullable: false;

        primaryRace nullable: false;
        protossWins nullable: false;
        terranWins nullable: false;
        zergWins nullable: false;
        highest1v1Rank nullable: false;
        highestTeamRank nullable: false;
        seasonTotalGames nullable: false;
        careerTotalGames nullable: false;

    }
}
