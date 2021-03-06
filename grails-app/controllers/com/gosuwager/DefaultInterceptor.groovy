package com.gosuwager

import grails.converters.JSON

import java.text.DateFormat
import java.text.SimpleDateFormat


class DefaultInterceptor {

    DefaultInterceptor() {
        matchAll()
    }

    boolean before() {
        if (!(controllerName == 'main' && actionName == 'index') &&
            !(controllerName == 'game' && actionName == 'completeUpload') &&
            !(controllerName == 'user' && actionName == 'logout') &&
            !(controllerName == 'auth')) {
            if (!params.csrf || params.csrf != session.csrf) {
                return false;
            }
        }


        def ipAddress = request.getRemoteAddr();
        if (ipAddress == null || ipAddress == '') {
            ipAddress = request.getHeader("X-Forwarded-For");
        }
        if (ipAddress == null || ipAddress == '') {
            ipAddress = request.getHeader("Client-IP");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        println sdf.format((new Date())) + ' : ' +
            request.method + ' ' +
            request.getPathInfo() + ' || ' +
            ipAddress + ' || ' +
            params + ' || ' +
            session;
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }

}
