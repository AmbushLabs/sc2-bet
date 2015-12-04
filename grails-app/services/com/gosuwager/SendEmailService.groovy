package com.gosuwager

import com.microtripit.mandrillapp.lutung.MandrillApi
import com.microtripit.mandrillapp.lutung.view.MandrillMessage
import com.microtripit.mandrillapp.lutung.view.MandrillMessageStatus
import grails.transaction.Transactional

@Transactional
class SendEmailService {

    def grailsApplication;

    def send(User u, String templateName, data) {
        return; //TODO: fix email template names
        def devKey = "kB1KnDIZhKaqIsf96H4BdQ";
        def prodKey = "GZxHhSsWtFGKgx6eKgksng";
        def siteUri = grailsApplication.config.getProperty('site_uri');

        MandrillApi mandrillApi = new MandrillApi(prodKey);
        MandrillMessage message = new MandrillMessage();
        message.setFromEmail("info@gosuwager.com");
        message.setFromName("Gosu Wager");

        ArrayList<String> tags = new ArrayList<String>();
        tags.add(templateName);

        List<MandrillMessage.MergeVar> mergeVars = new ArrayList<MandrillMessage.MergeVar>();
        mergeVars.add(new MandrillMessage.MergeVar("site_link", siteUri));
        def templateContent = [:];
        switch(templateName) {
            case 'welcome':

                break;
            case 'wager-created':
            case 'player1-rejected-player2':
            case 'player1-accepted-challenge':
            case 'player2-joined-wager':
            case 'player1-joined-wager':
                mergeVars.add(new MandrillMessage.MergeVar("wager_link", siteUri + 'w/' + data.id));
                break;

            case 'confirm-email':
                mergeVars.add(new MandrillMessage.MergeVar("confirm_email_link", siteUri + 'email/confirm?confirm=' + data.confirmHash));
                break;
        }

        Email e = u.emails.find {it.isPrimary && it.isActive};
        ArrayList<MandrillMessage.Recipient> recipients = new ArrayList<MandrillMessage.Recipient>();
        MandrillMessage.Recipient recipient = new MandrillMessage.Recipient();
        recipient.setEmail(e.email);
        recipients.add(recipient);
        message.setTo(recipients);
        message.setPreserveRecipients(true);
        message.setTags(tags);
        message.setGlobalMergeVars(mergeVars);

        MandrillMessageStatus[] messageStatusReports =
                mandrillApi.messages()
                           .sendTemplate(templateName, templateContent, message, false);

        messageStatusReports.each {
            println 'Email sent: ' + it.status + ' | ' + it.rejectReason + ' | ' + it.email;
            (new EmailTransaction([
                user: u,
                email: e,
                emailTemplate: templateName
            ])).save();
        }


    }


}
