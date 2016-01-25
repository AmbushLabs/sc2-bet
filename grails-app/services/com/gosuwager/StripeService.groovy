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
                            return u;
                        } else {
                            println u.errors;
                        }
                    } else {
                        println gct.errors;
                    }
                } else {
                    println sc.errors;
                }


            }

        } catch (CardException e) {
            // Since it's a decline, CardException will be caught
            println "Status is: " + e.getCode();
            println "Message is: " + e.getMessage();
        } catch (RateLimitException e) {
            // Too many requests made to the API too quickly
            println 'rate limit';
        } catch (InvalidRequestException e) {
            // Invalid parameters were supplied to Stripe's API
            println 'invalid request';
        } catch (AuthenticationException e) {
            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
            println 'auth bad';
        } catch (APIConnectionException e) {
            // Network communication with Stripe failed
            println 'api connection failed';
        } catch (StripeException e) {
            // Display a very generic error to the user, and maybe send
            // yourself an email
            println 'generic stripe exception';
        } catch (Exception e) {
            // Something else happened, completely unrelated to Stripe
            println e;
        }
    }


    def linkBankAccount(String routingNumber, String bankAccountNumber, String countryCode, User u) {

    }


}
