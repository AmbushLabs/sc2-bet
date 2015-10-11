require(['/assets/lib/underscore'], function(_) {
    var loginWindow = null;
    var windowChecker = null;
    $('*[data-ui-element="sign-up"]').click(function() {
        loginWindow = window.open(
            '/auth/bnet_start_auth',
            'targetWindow',
            'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=400'
        );
        windowChecker = setInterval(function() {
            if (loginWindow.closed) {
                clearInterval(windowChecker);
                window.location.href = '/';
            }
        }, 50);
    });
});