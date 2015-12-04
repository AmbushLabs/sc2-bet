package com.gosuwager

import grails.converters.JSON

class UserController {

    def SendEmailService;
    def DashboardService;

    def index() { }

    def hasEmail() {
        def ret = [:];
        User u = User.findById(session.user_id);
        if (u != null && u.emails.find { it.isActive && it.isPrimary }) {
            ret['has_email'] = true;
            ret['logged_in'] = true;
            ret['status'] = 'success';
        } else if (u != null) {
            ret['has_email'] = false;
            ret['logged_in'] = true;
            ret['status'] = 'success';
        } else {
            ret['logged_in'] = false;
            ret['error'] = 'No account';
            ret['status'] = 'error';
        }
        render ret as JSON;
    }

    def email() {
        def ret = [:];
        if (request.method == 'POST' && params.email_address) {
            def emailPattern = /[_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})/
            def isSuccessful = false;
            if (params.email_address ==~ emailPattern) {
                User u = User.findById(session.user_id);
                //sha1 hash
                def emailAddress = params.email_address.toString();
                Random r = new Random();
                def hash = (u.id + '_' + emailAddress + '*' + r.nextInt(250000)).toSHA1('salty-em4il-*gw');

                Email e = new Email([
                    email:emailAddress,
                    isPrimary: true,
                    isActive: true,
                    confirmHash: hash
                ]);
                if (e.save(flush:true)) {
                    u.addToEmails(e);
                    if (u.save()) {
                        isSuccessful = true;
                        ret = DashboardService.getInitializeData(u);
                        ret['status'] = 'success';
                        SendEmailService.send(u, 'confirm-email', e);
                    }
                }
            }
            if (!isSuccessful) {
                ret['has_email'] = false;
                ret['status'] = 'failure';
            }
        }
        render ret as JSON;
    }

}
