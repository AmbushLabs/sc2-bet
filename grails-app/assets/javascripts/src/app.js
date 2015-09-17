import './lib/jquery';
import './lib/dispatcher';
import React from './lib/react';
import NavBar from './modules/nav/nav-bar';

React.render(
    <NavBar />,
    document.getElementById('logged_in_nav')
);