package com.gosuwager

import grails.converters.JSON

class UserController {

    def index() { }

    def hasEmail() {
        def ret = [:];
        User u = User.findById(session.user_id);
        if (u != null && u.emails.find { it.isActive && it.isPrimary }) {
            ret['has_email'] = true;
            ret['status'] = 'success';
        } else if (u != null) {
            ret['has_email'] = false;
            ret['status'] = 'success';
        } else {
            ret['error'] = 'No account';
            ret['status'] = 'error';
        }
        render ret as JSON;
    }

    def email() {
        def ret = [:];
        if (request.method == 'POST' && params.email_address) {
            def emailPattern = /[_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})/

            if (params.email_address ==~ emailPattern) {
                User u = User.findById(session.user_id);
                Email e = new Email([
                    email:params.email_address,
                    isPrimary: true,
                    isActive: true
                ]);
                e.save(flush:true);
                u.addToEmails(e);
                u.save();
                ret['has_email'] = true;
                ret['status'] = 'success';
            } else {
                ret['has_email'] = false;
                ret['status'] = 'failure';
            }
        }
        render ret as JSON;
    }
}
