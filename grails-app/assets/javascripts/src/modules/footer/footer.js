/**
 * Created by joseph on 12/12/15.
 */
import React from 'react';

const Footer = ({loggedIn, user}) => {
    var logoutlnk = '';
    var adminLnk = '';
    if (loggedIn) {
        logoutlnk = (
            <div className="col center px2">
                <a href="/user/logout" className="h5 white">Logout</a>
            </div>
        );
        if (user && user.is_admin) {
            adminLnk = (
                <div className="col center px2">
                    <a href="/admin" className="h5 white">Admin</a>
                </div>
            );
        }
    }

    return (
        <section className="clearfix col col-12 white">
            <div className="col col-12 gosu-blue-bg">
                <div className="col col-12 md-col-8 py3">
                    <div className="col center px2">
                        <a href="mailto:support@gosuempire.zendesk.com?subject=Contact Gosu Empire" className="h5 white">Contact Us</a>
                    </div>
                    <div className="col center px2">
                        <a href="https://gosuempire.zendesk.com/hc/en-us/sections/203560088-FAQ" className="h5 white">FAQ</a>
                    </div>
                    <div className="col center px2">
                        <a href="https://gosuempire.zendesk.com/hc/en-us/categories/202447277-Rules" className="h5 white">Rules</a>
                    </div>
                    <div className="col center px2">
                        <a href="https://gosuempire.zendesk.com/hc/en-us/articles/214963648-Terms-of-Service" className="h5 white">Terms of Service</a>
                    </div>
                    {adminLnk}
                    {logoutlnk}
                </div>
                <div className="col col-12 md-col-4 center py3">
                    <span className="h6 white">an <a href="http://ambushlabs.com">AmbushLabs</a> production &copy;&nbsp;2015 </span>
                </div>
            </div>
        </section>
    );
}

export default Footer;