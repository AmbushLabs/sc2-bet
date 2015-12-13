package com.gosuwager

class ReferralCode {

    String referralCode;
    Integer timesUsed = 0;
    Integer maxTimes;
    Integer gosuCoinBonus;

    static constraints = {
        referralCode: nullable: false;
        timesUsed: nullable: false;
        maxTimes: nullable: true;
        gosuCoinBonus: nullable: false;
    }
}
