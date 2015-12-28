import com.gosuwager.BattleNetAccount
import com.gosuwager.BattleNetToken
import com.gosuwager.Email
import com.gosuwager.ReferralCode
import com.gosuwager.User
import com.gosuwager.bnet.SC2Character
import org.springframework.web.context.support.WebApplicationContextUtils

import java.security.MessageDigest

class BootStrap {

    def init = { servletContext ->

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "objectMarshallers" ).register()


        String.metaClass.toSHA1 = { salt = "" ->
            def messageDigest = MessageDigest.getInstance("SHA1")

            messageDigest.update(salt.getBytes())
            messageDigest.update(delegate.getBytes())

            /*
         * Why pad up to 40 characters? Because SHA-1 has an output
         * size of 160 bits. Each hexadecimal character is 4-bits.
         * 160 / 4 = 40
         */
            new BigInteger(1, messageDigest.digest()).toString(16).padLeft(40, '0')
        }

        (new ReferralCode([
            referralCode: 'RADIATOR_GANG',
            timesUsed: 0,
            maxTimes: 20,
            gosuCoinBonus: 2500
        ])).save();


    }

    def createUser(emailAddress, battleTag) {
        User u = new User([
            gosuCoins: 100,
            referralCode: 'suckaphree'
        ]);

        Email e = new Email([
                email: emailAddress,
                isPrimary: true,
                isActive: true,
                isConfirmed: true,
                confirmHash: 'hi'
        ]);

        if (!e.save()) {
            println e.errors;
        }

        u.addToEmails(e);

        BattleNetAccount bna = new BattleNetAccount([
                battleNetId: 7000,
                battleTag: battleTag
        ]);

        BattleNetToken bnt = new BattleNetToken([
                accessToken:"hi",
                scope:"hi",
                expiresIn:99999999,
                active:true,

        ]);

        SC2Character sc2char = new SC2Character([
                characterId: 9999,
                realm: 1,
                name: battleTag,
                displayName: battleTag,
                clanName: null,
                clanTag: null,
                profilePath: 'slash',
                portraitUrl: 'slash',
                portraitHeight: 100,
                portraitWidth: 100,
                portraitX: 0,
                portraitY: 0,
                portraitOffset: 0,
                avatarUrl: 'slash',
                avatarHeight: 100,
                avatarWidth: 100,
                avatarX: 0,
                avatarY: 0,
                avatarOffset: 0,
                primaryRace: 'PROTOSS',
                protossWins: 100,
                terranWins: 5,
                zergWins: 8,
                highest1v1Rank: 'DIAMOND',
                highestTeamRank: 'PLATINUM',
                seasonTotalGames: 0,
                careerTotalGames: 100
        ]);

        bna.addToCharacters(sc2char);
        bna.addToTokens(bnt);

        u.battleNetAccount = bna;

        if (sc2char.save()) {
            if (bnt.save()) {
                if (u.save()) {
                    println 'Test user saved!';
                } else {
                    println u.errors;
                }
                if (bna.save()) {
                    println 'Test Battle net account saved!';
                } else {
                    println bna.errors
                }
            } else {
                println bnt.errors;
            }
        } else {
            println sc2char.errors;
        }
    }





    def destroy = {
    }
}
