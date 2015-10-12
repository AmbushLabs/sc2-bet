import org.springframework.web.context.support.WebApplicationContextUtils

import java.security.MessageDigest

class BootStrap {

    def init = { servletContext ->

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "objectMarshallers" ).register()


        String.metaClass.toSHA1 = { salt = "" ->
            def messageDigest = MessageDigest.getInstance("SHA1")

            messageDigest.update(salt.getBytes())
            messageDigest.update(delegate.getBytes())

            /*
         * Why pad up to 40 characters? Because SHA-1 has an output
         * size of 160 bits. Each hexadecimal character is 4-bits.
         * 160 / 4 = 40
         */
            new BigInteger(1, messageDigest.digest()).toString(16).padLeft(40, '0')
        }
    }
    def destroy = {
    }
}
