import './lib/jquery';
import Dispatcher from './lib/dispatcher';
import React from './lib/react';
import NavBar from './modules/nav/nav-bar';
import GameList from './modules/games/game-list';

var gameDispatcher = new Dispatcher();

React.render(
    <NavBar gameDispatcher={gameDispatcher} />,
    document.getElementById('logged_in_nav')
);

var games = {};


React.render(
    <GameList games={[]} gameDispatcher={gameDispatcher} />,
    document.getElementById('game_list')
);