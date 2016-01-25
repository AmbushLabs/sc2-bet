package com.gosuwager

import com.stripe.Stripe
import com.stripe.exception.APIConnectionException
import com.stripe.exception.AuthenticationException
import com.stripe.exception.CardException
import com.stripe.exception.InvalidRequestException
import com.stripe.exception.RateLimitException
import com.stripe.exception.StripeException
import com.stripe.model.Charge
import grails.transaction.Transactional

@Transactional
class StripeService {

    def grailsApplication;
    def SendEmailService;

    def processPayment(String cardToken, String stripeEmail, Integer price, Integer coinAmount, User u) {
        def ret = [:]
        ret['success'] = false;
        try {
            // Use Stripe's bindings...
            Stripe.apiKey = grailsApplication.config.getProperty('stripe.secret');
            Stripe.apiVersion = "2015-10-16";

            Map<String, Object> chargeParams = new HashMap<String, Object>();
            chargeParams.put("amount", price);
            chargeParams.put("currency", "usd");
            chargeParams.put("source", cardToken);
            chargeParams.put("description", "Charge for ");

            Charge c = Charge.create(chargeParams);
            if (c.getPaid() && c.getStatus().equals("succeeded")) {
                StripeCharge sc = new StripeCharge([
                    chargeId: c.getId(),
                    amount: c.getAmount(),
                    balanceTransaction: c.getBalanceTransaction(),
                    stripeDateCreated: new Date(c.getCreated()),
                    currency: c.getCurrency(),
                    description: c.getDescription(),
                    stripeEmail: stripeEmail
                ]);
                if (sc.save(flush:true)) {
                    GosuCoinTransaction gct = new GosuCoinTransaction([
                        transactionType: "purchase",
                        coinAmount: coinAmount,
                        owner: u,
                        stripeCharge: sc
                    ]);
                    if(gct.save()) {
                        u.gosuCoins += coinAmount;
                        if(u.save()) {
                            SendEmailService.send(u, 'purchase-gosu-coin', [gosu_coin_amount:coinAmount]);
                            ret['success'] = true;
                            ret['user'] = u;
                        } else {
                            ret['error'] = true;
                            ret['error_reason'] = 'general_problem';
                            println u.errors;
                        }
                    } else {
                        ret['error'] = true;
                        ret['error_reason'] = 'general_problem';
                        println gct.errors;
                    }
                } else {
                    ret['error'] = true;
                    ret['error_reason'] = 'general_problem';
                    println sc.errors;
                }
            }

        } catch (CardException e) {
            // Since it's a decline, CardException will be caught
            println "Status is: " + e.getCode();
            println "Message is: " + e.getMessage();
            ret['error'] = true;
            ret['error_reason'] = 'card_exception';
        } catch (RateLimitException e) {
            // Too many requests made to the API too quickly
            ret['error'] = true;
            ret['error_reason'] = 'stripe_rate_limit';
            println 'stripe rate limit error';
        } catch (InvalidRequestException e) {
            // Invalid parameters were supplied to Stripe's API
            println 'invalid request';
            ret['error'] = true;
            ret['error_reason'] = 'stripe_invalid_request';
        } catch (AuthenticationException e) {
            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
            println 'auth bad';
            ret['error'] = true;
            ret['error_reason'] = 'stripe_auth_invalid';
        } catch (APIConnectionException e) {
            // Network communication with Stripe failed
            println 'api connection failed';
            ret['error'] = true;
            ret['error_reason'] = 'stripe_network_failed';
        } catch (StripeException e) {
            // Display a very generic error to the user, and maybe send
            // yourself an email
            println 'generic stripe exception';
            ret['error'] = true;
            ret['error_reason'] = 'general_problem';
        } catch (Exception e) {
            // Something else happened, completely unrelated to Stripe
            ret['error'] = true;
            ret['error_reason'] = 'general_problem';
            println e;
        }
        return ret;
    }


    def linkBankAccount(String routingNumber, String bankAccountNumber, String countryCode, User u) {

    }


}
