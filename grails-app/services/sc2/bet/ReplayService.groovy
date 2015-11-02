package sc2.bet

import grails.transaction.Transactional
import sun.misc.BASE64Encoder

import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

@Transactional
class ReplayService {

    def serviceMethod() {

    }

    def s3PolicyAndSignature() {
        def policyDocument = "{\"expiration\": \"2016-01-01T00:00:00Z\",\n" +
                "  \"conditions\": [ \n" +
                "    {\"bucket\": \"gosuempire\"}, \n" +
                "    [\"starts-with\", \"\$key\", \"replays/\"],\n" +
                "    {\"acl\": \"private\"},\n" +
                "    {\"success_action_redirect\": \"https://localhost:8443/\"}\n" +
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
}
