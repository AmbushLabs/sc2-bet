import checkEmail from './../../api/user/checkEmail';

export default (dispatch, csrf) => {
    var loginWindow = window.open(
        '/auth/bnet_start_auth',
        'targetWindow',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=400'
    );
    var windowChecker = setInterval(function() {
        if (loginWindow.closed) {
            clearInterval(windowChecker);
            dispatch(checkEmail(csrf.value));
        }
    }.bind(this), 50);
}