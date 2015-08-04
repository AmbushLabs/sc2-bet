<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><g:layoutTitle default="Gosu Wager"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <asset:stylesheet src="basscss.css"/>
    <asset:javascript src="lib/jquery-2.1.4.min.js"/>
    <asset:javascript src="require.js"/>
    <asset:javascript src="application.js"/>
    <g:layoutHead/>
</head>
<body>
<g:if test="${logged_in}">
    <g:render template="/layouts/includes/logged_in/nav" />
</g:if>
<g:else>
    <g:render template="/layouts/includes/logged_out/nav" />
</g:else>
<g:layoutBody/>
</body>
</html>
