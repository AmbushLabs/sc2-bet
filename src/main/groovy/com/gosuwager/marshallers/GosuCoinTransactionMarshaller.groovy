package com.gosuwager.marshallers

import com.gosuwager.GosuCoinTransaction
import grails.converters.JSON

/**
 * Created by aaronhenshaw on 1/23/16.
 */
class GosuCoinTransactionMarshaller {

    void register() {
        JSON.registerObjectMarshaller(GosuCoinTransaction) { GosuCoinTransaction gct ->
            def ret = [:];
            ret.'id' = gct.id;
            ret.'coin_amount' = gct.coinAmount;
            if (gct.originalOwner) {
                ret.'original_owner' = [:];
                ret.'original_owner'.'id' = gct.originalOwner.id;
            }
            ret.'type' = gct.transactionType;
            ret.'bit_coin_amount' = gct.bitCoinAmount;
            ret.'create_date' = gct.createDate.getTime();
            return ret;
        }
    }
}
