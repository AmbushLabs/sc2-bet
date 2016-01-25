package sc2.bet

import com.gosuwager.GosuCoinTransaction
import com.gosuwager.GosuCoinWithdrawlRequest
import com.gosuwager.User
import grails.converters.JSON

class AdminController {

    def AdminService;
    def SendEmailService;

    def index() { }

    def initialize() {
        def ret = [:];
        User u = User.findById(session.user_id);
        ret['admin'] = AdminService.getAdminData(u);
        render ret as JSON;
    }

    def processWithdrawlRequest() {
        def ret = [:];
        User u = User.findById(session.user_id);
        if (request.method == 'POST'
                && params.gosu_coin_withdrawl_request_id
                && params.bit_coin_amount
                && u && u.isAdmin) {
            GosuCoinWithdrawlRequest gcwr = GosuCoinWithdrawlRequest.findById(params.gosu_coin_withdrawl_request_id);
            if (gcwr && !gcwr.processed) {
                gcwr.processed = true;
                gcwr.processedDate = new Date();
                GosuCoinTransaction gct = new GosuCoinTransaction([
                    coinAmount: -Math.abs(gcwr.amount),
                    bitCoinAmount: Float.valueOf(params.bit_coin_amount),
                    withdrawlRequest: gcwr,
                    transactionType: 'withdrawl',
                    originalOwner: gcwr.user
                ]);
                if (gct.save(flush:true)) {
                    if (gcwr.save(flush:true)) {
                        ret['succes'] = true;
                        SendEmailService.send(gcwr.user, 'gosu-coin-withdrawl-complete', [gosu_coin_amount:gcwr.amount]);
                    } else {
                        ret['error'] = true;
                        ret['error_reason'] = 'general_problem';
                    }
                } else {
                    println gct.errors;
                    ret['error'] = true;
                    ret['error_reason'] = 'general_problem';
                }
            }
        }

        ret['admin'] = AdminService.getAdminData(u);
        render ret as JSON;
    }
}
