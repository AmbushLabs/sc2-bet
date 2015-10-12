<%--
  Created by IntelliJ IDEA.
  User: aaronhenshaw
  Date: 10/12/15
  Time: 3:06 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <g:if test="${confirmed}">
        <META http-equiv="refresh" content="5;URL=/">
    </g:if>
</head>

<body>
    <g:if test="${confirmed}">
        <div>Thanks for confirming your email. You will now be redirected back to Gosu Wager!</div>
    </g:if>
    <g:else>
        <div>Something went wrong confirming this email. Sorry :(</div>
    </g:else>
</body>
</html>