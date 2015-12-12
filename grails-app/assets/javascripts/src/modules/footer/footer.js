/**
 * Created by joseph on 12/12/15.
 */
import React from 'react';

const Footer = ({linka}) => {
    //code things
    const a = 'true';

    return (
        <nav className="clearfix col col-12 gosu-blue-bg white">
            <div className="sm-col py2 my2">
                <a href="mailto:support@gosuempire.zendesk.com?subject=Contact Gosu Empire" className="h5 p4 m4 white">Contact Us</a>
                <a href="https://gosuempire.zendesk.com/hc/en-us/sections/203560088-FAQ" className="h5 p4 m4 white">FAQ</a>
                <a href="https://gosuempire.zendesk.com/hc/en-us/categories/202447277-Rules" className="h5 p4 m4 white">Rules</a>
                <a href="https://gosuempire.zendesk.com/hc/en-us/articles/214963648-Terms-of-Service" className="h5 p4 m4 white">Terms of Service</a>
            </div>
            <div>

            </div>
        </nav>
    );
}

export default Footer;