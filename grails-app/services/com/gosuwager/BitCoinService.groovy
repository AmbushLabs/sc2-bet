package com.gosuwager

import grails.transaction.Transactional
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method

@Transactional
class BitCoinService {

    def getCurrentPriceUSD() {
        def http = new HTTPBuilder("https://api.coindesk.com");
        http.request(Method.GET, ContentType.JSON) {
            uri.path = '/v1/bpi/currentprice.json';
            headers.'User-Agent' = 'GosuEmpire v0.1';

            response.success = { resp, json ->
                return [
                        currencySymbol: json.bpi.USD.symbol,
                        rate: json.bpi.USD.rate
                ];
            }

            response.failure = { resp, data ->
                println "Unexpected error: ${resp.statusLine.statusCode} : ${resp.statusLine.reasonPhrase}";
            }
        }
    }
}
