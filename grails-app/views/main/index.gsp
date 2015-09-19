<%--
  Created by IntelliJ IDEA.
  User: aaronhenshaw
  Date: 8/2/15
  Time: 10:03 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <asset:javascript src="application.js"/>
</head>
<body>
    <g:if test="${logged_in}">
        <g:render template="/main/logged_in" />
    </g:if>
    <g:else>
        <g:render template="/main/logged_out" />
    </g:else>
</body>
</html>