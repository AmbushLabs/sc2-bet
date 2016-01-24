package com.gosuwager.marshallers

import com.gosuwager.GosuCoinWithdrawlRequest
import grails.converters.JSON

/**
 * Created by aaronhenshaw on 1/23/16.
 */
class GosuCoinWithrawlRequestMarshaller {

    void register() {
        JSON.registerObjectMarshaller(GosuCoinWithdrawlRequest) { GosuCoinWithdrawlRequest gcwr ->
            def ret = [:];
            ret['id'] = gcwr.id;
            ret['user'] = [:];
            ret.'user'.'id' = gcwr.user.id;
            ret.'user'.'battle_tag' = gcwr.user.battleNetAccount.battleTag;
            ret.'create_date' = gcwr.createDate.getTime();
            ret.'coin_amount' = gcwr.amount;
            ret.'bit_coin_rate' = gcwr.bitCoinRate;
            ret.'processed' = gcwr.processed;
            ret.'processed_date' = gcwr.processedDate.getTime();
            ret.'bit_coin_wallet_id' = gcwr.bitCoinWalletId;
            return ret;
        }
    }

}
