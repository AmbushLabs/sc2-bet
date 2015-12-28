package com.gosuwager


class DefaultInterceptor {

    DefaultInterceptor() {
        matchAll()
    }

    boolean before() {
        println request.method + ' ' + request.getPathInfo() + ' ' + params + ' ' + session;
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }

}
