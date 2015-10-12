package com.gosuwager

class EmailTransaction {

    User user;
    Email email;
    String emailTemplate;

    static constraints = {
        user (nullable:false);
        email (nullable:false);
        emailTemplate (nullable:false);
    }
}
