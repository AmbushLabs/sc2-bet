package sc2.bet

import com.microtripit.mandrillapp.lutung.MandrillApi
import com.microtripit.mandrillapp.lutung.view.MandrillMessage
import com.microtripit.mandrillapp.lutung.view.MandrillMessageStatus
import grails.transaction.Transactional

@Transactional
class EmailService {

    def groovyPageRenderer;

    def sendWelcomeEmail() {
        def devKey = "kB1KnDIZhKaqIsf96H4BdQ";
        def prodKey = "GZxHhSsWtFGKgx6eKgksng";

        MandrillApi mandrillApi = new MandrillApi(prodKey);

        // create your message
        MandrillMessage message = new MandrillMessage();
        message.setFromEmail("info@gosuwager.com");
        message.setFromName("Gosu Wager");

        // add recipients
        ArrayList<MandrillMessage.Recipient> recipients = new ArrayList<MandrillMessage.Recipient>();
        MandrillMessage.Recipient recipient = new MandrillMessage.Recipient();
        recipient.setEmail("aaronhenshaw@gmail.com");
        recipient.setName("Aaron Henshaw");
        recipients.add(recipient);
        message.setTo(recipients);
        message.setPreserveRecipients(true);
        ArrayList<String> tags = new ArrayList<String>();
        tags.add("welcome");
        message.setTags(tags);


        MandrillMessageStatus[] messageStatusReports = mandrillApi
            .messages().sendTemplate("welcome-to-gosu-wager", null, message, false);
        messageStatusReports.each {
            println 'Email sent: ' + it.status + ' | ' + it.rejectReason + ' | ' + it.email;
        }
    }
}
