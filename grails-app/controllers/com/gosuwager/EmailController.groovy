package com.gosuwager

class EmailController {

    def SendEmailService;

    def index() { }

    def confirm() {
        def isConfirmed = false;
        if (params.confirm) {
            Email e = Email.findByConfirmHash(params.confirm);
            if (e != null) {
                e.isConfirmed = true;
                if (e.save()) {
                    isConfirmed = true;
                    SendEmailService.send(e.user, 'welcome-to-gosu-wager', e);
                }
            }
        }
        [
            confirmed:isConfirmed
        ]
    }
}
