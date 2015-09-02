package com.gosuwager.marshallers

/**
 * Created by aaronhenshaw on 9/2/15.
 */
class ObjectMarshallers {

    List marshallers = [];

    def register() {
        marshallers.each { it.register() };
    }
}
