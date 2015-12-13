package com.gosuwager

import grails.transaction.Transactional

import java.security.SecureRandom

@Transactional
class ReferralCodeService {

    private static final Integer MAX_USER_REFERRALS = 3;
    private static final Integer REFERRAL_SIGNUP_GOSU_COIN_BONUS = 100;
    private static final Integer REFERRER_GOSU_COIN_BONUS = 50;

    private static char[] VALID_CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456879".toCharArray();

    def randomAlphaNumericString() {
        int numChars = 10;
        SecureRandom srand = new SecureRandom();
        Random rand = new Random();
        char[] buff = new char[numChars];

        for (int i = 0; i < numChars; ++i) {
            // reseed rand once you've used up all available entropy bits
            if ((i % 10) == 0) {
                rand.setSeed(srand.nextLong()); // 64 bits of random!
            }
            buff[i] = VALID_CHARACTERS[rand.nextInt(VALID_CHARACTERS.length)];
        }
        return new String(buff);
    }

    def handleReferralCode(String code, User newUser) {
        User u = User.findByReferralCode(code);
        if (u != null) {
            if (u.referralUses < MAX_USER_REFERRALS) {
                u.referralUses++;
                u.gosuCoins += REFERRER_GOSU_COIN_BONUS;
                u.save();
                newUser.gosuCoins += REFERRAL_SIGNUP_GOSU_COIN_BONUS;
                newUser.referralCodeUsed = code;
                newUser.referralCodeUsedType = 'user';
                newUser.save();
            }
        } else {
            ReferralCode rc = ReferralCode.findByReferralCode(code);
            if (rc != null && rc.timesUsed < rc.maxTimes) {
                rc.timesUsed++;
                rc.save();
                newUser.gosuCoins += rc.gosuCoinBonus;
                newUser.referralCodeUsed = code;
                newUser.referralCodeUsedType = 'referral_code';
                newUser.save();
            }
        }
    }
}
