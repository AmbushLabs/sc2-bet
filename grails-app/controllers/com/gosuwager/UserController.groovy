package com.gosuwager

import grails.converters.JSON

class UserController {

    def SendEmailService;
    def DashboardService;
    def ReferralCodeService;

    def index() { }

    def logout() {
        session.user_id = null;
        redirect(url:'/')
    }

    def hasEmail() {
        def ret = [:];
        ret['has_loaded'] = true;
        User u = User.findById(session.user_id);
        if (u != null && u.emails.find { it.isActive && it.isPrimary }) {
            ret = DashboardService.getInitializeData(u);
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
                def emailAddress = params.email_address.toString().trim().toLowerCase();
                Email eCheck = Email.findByEmail(emailAddress);
                if (eCheck == null) {
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
                            if (params.referral_code && params.referral_code.trim() != '') {
                                ReferralCodeService.handleReferralCode(params.referral_code.trim(), u);
                            }
                            isSuccessful = true;
                            ret = DashboardService.getInitializeData(u);
                            ret['status'] = 'success';
                            SendEmailService.send(u, 'confirm-email', e);
                        } else {
                            println u.errors;
                        }
                    } else {
                        println e.errors;
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

    def profile() {
        def ret = [:];
        if (request.method == 'GET' && params.user_id) {
            User u = User.findById(params.user_id);
            ret['user'] = u;

            def gamesQuery = Game.where {
                completed == true && (player1 == u || player2 == u)
            };

            def gp = gamesQuery.list(sort:"createDate", order:"desc");
            ret['games_played'] = gp;

        }
        render ret as JSON;
    }

    def invitational() {
        def ret = [:];
        ret['success'] = false;
        if (request.method == 'POST' && session.user_id) {
            User u = User.findById(session.user_id);
            TournamentSignUp signup = TournamentSignUp.findByUserAndActive(u, true);
            if (signup == null) {
                signup = new TournamentSignUp([
                    user: u,
                    active: true,
                    tournamentName: 'invitationalFebruary2016'
                ]);
                if (signup.save()) {
                    ret['success'] = true;
                    ret['invitational'] = [:];
                    ret['invitational']['joined'] = true;
                } else {
                    println signup.errors;
                }
            }
        }
        render ret as JSON;
    }

}
