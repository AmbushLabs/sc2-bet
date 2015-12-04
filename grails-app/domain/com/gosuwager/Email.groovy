package com.gosuwager

class Email {

    static belongsTo = [user:User]

    private static final Date NULL_DATE = new Date(0)

    Date createDate = NULL_DATE;

    String email;
    Boolean isPrimary = false;
    Boolean isActive = true;
    Boolean isConfirmed = false;

    String confirmHash;

    def beforeInsert() {
        if (createDate == NULL_DATE) {
            createDate = new Date();
        }
    }

    static constraints = {
        user (nullable: true)
        email (nullable: false)
        isPrimary (nullable: false)
        isActive (nullable: false)
        createDate (nullable: false)
        isConfirmed (nullable: false)
        confirmHash (nullable: false)
    }
}
