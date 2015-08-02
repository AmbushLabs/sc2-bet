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

    String avatarUrl;
    Integer avatarHeight;
    Integer avatarWidth;
    Integer avatarX;
    Integer avatarY;

    String primaryRace;
    Integer protossWins;
    Integer terranWins;
    Integer zergWins;
    String highest1v1Rank;
    String highestTeamRank;
    Integer seasonTotalGames;
    Integer careerTotalGames;

    static constraints = {
    }
}
