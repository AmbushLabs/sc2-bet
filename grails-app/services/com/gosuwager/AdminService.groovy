package com.gosuwager

import grails.transaction.Transactional

@Transactional
class AdminService {

    def getAdminData(User u) {
        def ret = [:];
        ret['admin'] = [:];
        if (u.isAdmin) {
            ret['admin']['authorized'] = true;
            ret['admin']['withdrawl_requests'] = GosuCoinWithdrawlRequest.findAllByProcessed(false);
            ret['admin']['recent_transactions'] = GosuCoinTransaction.findAll([limit: 30, order: 'DESC', sortBy: 'createDate']);
            ret['admin']['recent_users'] = User.findAll([order:'desc', sort: 'id', max:20]);
        } else {
            ret['admin']['authorized'] = false;
        }
        return ret['admin'];
    }
}
