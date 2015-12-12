/**
 * Created by joseph on 12/12/15.
 */
import React from 'react';

const Footer = ({linka}) => {
    //code things
    const a = 'true';

    return (
        <nav className="clearfix col col-12 gosu-blue-bg white">
            <div className="sm-col">
                <div >Gosu Empire, 2015 ** New York, NY ** GLHF</div>
                <a href="mailto:support@gosuempire.zendesk.com?subject=Contact Gosu Empire" className="btn py2">Contact Us</a>
                <a href="https://gosuempire.zendesk.com/hc/en-us/sections/203560088-FAQ" className="btn py2">FAQ</a>
                <a href="https://gosuempire.zendesk.com/hc/en-us/categories/202447277-Rules" className="btn py2">Rules</a>
                <a href="https://gosuempire.zendesk.com/hc/en-us/articles/214963648-Terms-of-Service" className="btn py2">Terms of Service</a>
            </div>
        </nav>
    );
}

export default Footer;