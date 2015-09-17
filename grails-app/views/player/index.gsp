<%--
  Created by IntelliJ IDEA.
  User: joseph
  Date: 9/17/15
  Time: 4:50 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
</head>
<body>
<g:if test="${logged_in}">
    <g:render template="/player/public" />
</g:if>
<g:else>
    <g:render template="/player/public" />
</g:else>
</body>
</html>
