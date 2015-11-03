package com.gosuwager


class GameInterceptor {

    GameInterceptor() {
        matchAll()
    }

    boolean before() {
        println 'game interceptor'
        header( "Access-Control-Allow-Origin", "null")
        header( "Access-Control-Allow-Credentials", "true")
        header( "Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
        header( "Access-Control-Max-Age", "3600")
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }

}
