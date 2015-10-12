package com.gosuwager

class EmailController {

    def index() { }

    def confirm() {
        def isConfirmed = false;
        if (params.confirm) {
            Email e = Email.findByConfirmHash(params.confirm);
            if (e != null) {
                e.isConfirmed = true;
                if (e.save()) {
                    isConfirmed = true;
                }
            }
        }
        [
            confirmed:isConfirmed
        ]
    }
}
