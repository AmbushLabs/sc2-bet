package com.gosuwager

class Email {

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;

    String email;
    Boolean isPrimary = false;
    Boolean isActive = true;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        email (nullable: false)
        isPrimary (nullable: false)
        isActive (nullable: false)
        createDate (nullable: false)
    }
}
