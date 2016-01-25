package com.gosuwager

import com.amazonaws.auth.AWSCredentials
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.services.s3.AmazonS3Client
import com.amazonaws.services.s3.model.GetObjectRequest
import com.amazonaws.services.s3.model.S3Object
import com.devdaily.system.ThreadedStreamHandler
import org.grails.web.json.JSONObject
import sun.misc.BASE64Encoder
import grails.transaction.Transactional

import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.security.MessageDigest
import java.text.SimpleDateFormat

@Transactional
class ReplayService {

    def grailsApplication;

    def arePlayersValid(GameReplay gr) {
        def char1 = null, char2 = null;
        gr.game.player1.battleNetAccount.characters.each {
            if (it.characterId == gr.player1Uid
                    || it.characterId == gr.player2Uid) {
                char1 = it;
            }
        }
        gr.game.player2.battleNetAccount.characters.each {
            if (it.characterId == gr.player1Uid
                    || it.characterId == gr.player2Uid) {
                char2 = it;
            }
        }
        return (char1 != null && char2 != null);
    }

    def updateGameFromReplay(GameReplay gr) {
        if (gr.processed && gr.game.player1 && gr.game.player2 && gr.game.challengerAccepted) {
            //first confirm valid replay
            //lets get characters a & b
            def creatorChar, chalChar;
            def creatorWon = false, challengerWon = false;
            gr.game.player1.battleNetAccount.characters.each {
                if (it.characterId == gr.player1Uid
                    || it.characterId == gr.player2Uid) {
                    creatorChar = it;
                    if (it.characterId == gr.player1Uid) {
                        if (gr.player1Result.toLowerCase() == "win") {
                            creatorWon = true;
                        } else {
                            challengerWon = true;
                        }
                    } else {
                        if (gr.player2Result.toLowerCase() == "win") {
                            creatorWon = true;
                        } else {
                            challengerWon = true;
                        }
                    }
                }
            }
            gr.game.player2.battleNetAccount.characters.each {
                if (it.characterId == gr.player1Uid
                        || it.characterId == gr.player2Uid) {
                    chalChar = it;
                }
            }

            gr.game.completed = true;
            if (creatorWon) {
                gr.game.winner = "player1";
                gr.game.player1.contestWins++;
                gr.game.player2.contestLosses++;
            } else {
                gr.game.winner = "player2";
                gr.game.player1.contestLosses++;
                gr.game.player2.contestWins++;
            }
            if (gr.game.save() && gr.game.player1.save() && gr.game.player2.save()) {

            } else {
                println gr.game.errors;
                println gr.game.player1.errors;
                println gr.game.player2.errors;
            }
        }
    }

    def s3PolicyAndSignature() {
        String siteUri = grailsApplication.config.getProperty('site_uri');

        Date d = new Date() + 1;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");

        String policyDocument =
                //"{\"expiration\": \"2016-01-01T00:00:00Z\",\n" +
                "{\"expiration\": \"" + df.format(d) + "Z\",\n" +
                "  \"conditions\": [ \n" +
                "    {\"bucket\": \"gosuempire\"}, \n" +
                "    [\"starts-with\", \"\$key\", \"replays/\"],\n" +
                "    {\"acl\": \"private\"},\n" +
                "    {\"success_action_redirect\": \"" + siteUri + "game/completeUpload\"}\n" +
                "  ]\n" +
                "}";

        println policyDocument;
        String policy = (new BASE64Encoder()).encode(
                policyDocument.getBytes("UTF-8")).replaceAll("\n","").replaceAll("\r","");

        Mac hmac = Mac.getInstance("HmacSHA1");
        hmac.init(new SecretKeySpec("E5Z0voIfYp+ias8jCFQypU/el69BeL9a19mXOnqx".getBytes("UTF-8"), "HmacSHA1"));
        String signature = (new BASE64Encoder()).encode(
                hmac.doFinal(policy.getBytes("UTF-8")))
                .replaceAll("\n", "");
        return [policy: policy, signature: signature];
    }

    def downloadReplayFromS3ToLocal(file, replay) {
        AWSCredentials credentials = new BasicAWSCredentials("AKIAJ3N46OA77EEOEHZA", "E5Z0voIfYp+ias8jCFQypU/el69BeL9a19mXOnqx");
        AmazonS3Client s3Client = new AmazonS3Client(credentials);
        S3Object s3object = s3Client.getObject(new GetObjectRequest(replay.bucket, replay.replayFullPath));
        InputStream objectData;
        OutputStream toFile;
        try {
            // Process the objectData stream.
            // save the file locally
            objectData = s3object.getObjectContent();
            toFile = new FileOutputStream(new File(file));

            int read = 0;
            byte[] bytes = new byte[1024];

            while ((read = objectData.read(bytes)) != -1) {
                toFile.write(bytes, 0, read);
            }

        } catch (Exception ex) {

        } finally {
            objectData.close();
            toFile.close();
        }
        return true;
    }

    def getFileHash(String filePath) {
        InputStream fis =  new FileInputStream(filePath);
        try {
            byte[] buffer = new byte[1024];
            MessageDigest complete = MessageDigest.getInstance("SHA-1");
            int numRead;
            while ((numRead = fis.read(buffer)) != -1) {
                if (numRead > 0) {
                    complete.update(buffer, 0, numRead);
                }
            }
            return new String(complete.digest());
        } finally {
            fis.close();
        }
        return "";
    }

    def getUniqueGameHashes(uid1, uid2, map, Date startTime) {
        def hashes = [:];
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        hashes['1'] = String.format("%s-%s-%s-%s", uid1.toString(), uid2.toString(), map, sdf.format(startTime));
        hashes['2'] = String.format("%s-%s-%s-%s", uid2.toString(), uid1.toString(), map, sdf.format(startTime));
        return hashes;
    }

    def getJsonFromReplayFile(file) {
        String cmd = System.getProperty("user.dir") + "/parse_replay.py";
        println 'running ' + cmd;
        Process p = new ProcessBuilder("python", cmd, "-f", file).start();

        ThreadedStreamHandler inputStreamHandler = new ThreadedStreamHandler(p.getInputStream());
        ThreadedStreamHandler errorStreamHandler = new ThreadedStreamHandler(p.getErrorStream());

        inputStreamHandler.start();
        errorStreamHandler.start();

        p.waitFor();

        inputStreamHandler.interrupt();
        errorStreamHandler.interrupt();
        inputStreamHandler.join();
        errorStreamHandler.join();

        String jsonGameData = inputStreamHandler.getOutputBuffer().toString();
        return new JSONObject(jsonGameData);

    }

    def updateReplayFromJSONReplay(JSONObject jgd, GameReplay replay) {
        JSONObject player1 = jgd.getJSONObject("player_1_detail_data")
        JSONObject player2 = jgd.getJSONObject("player_2_detail_data")

        replay.gameStartTime = new Date(jgd.getLong("start_time"));
        //replay.gameEndTime = new Date(jgd.getLong("end_time"));
        replay.mapName = jgd.getString("map_name");
        replay.numberOfPlayers = jgd.getInt("num_players");
        replay.player1Race = jgd.getString("player_1_pick_race");
        replay.player2Race = jgd.getString("player_2_pick_race");
        replay.player1Result = jgd.getString("player_1_result");
        replay.player2Result = jgd.getString("player_2_result");


        JSONObject p1bnet = player1.getJSONObject("bnet");
        replay.player1Name = player1.getString("name");
        replay.player1BnetRegion = p1bnet.getInt("region");
        replay.player1BnetSubRegion = p1bnet.getInt("subregion");
        replay.player1Uid = p1bnet.getInt("uid");

        JSONObject p2bnet = player2.getJSONObject("bnet");
        replay.player2Name = player2.getString("name");
        replay.player2BnetRegion = p2bnet.getInt("region");
        replay.player2BnetSubRegion = p2bnet.getInt("subregion");
        replay.player2Uid = p2bnet.getInt("uid");

        if (replay.save()) {
            return true;
        } else {
            println replay.errors;
            return false;
        }
    }
}
