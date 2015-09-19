import './lib/jquery';
import Dispatcher from './lib/dispatcher';
import React from './lib/react';
import NavBar from './modules/nav/nav-bar';
import GameList from './modules/games/game-list';



var $logged_in_nav = $('#logged_in_nav');
if ($logged_in_nav.length > 0) {

    var searchGameDispatcher = new Dispatcher();
    var myGameDispatcher = new Dispatcher();
    var searchGames = {};
    var myGames = {};

    //Render the logged in navigation
    React.render(
        <NavBar gameDispatcher={myGameDispatcher} />,
        $logged_in_nav[0]
    );

    //TODO: seperate things into page components.
    var $game_list = $('#dashboard_find_games');
    if ($game_list.length > 0) {
        //render games list on dashboard.
        React.render(
            <GameList games={searchGames} gameDispatcher={searchGameDispatcher} listType="search" />,
            $game_list[0]
        );
    }

    var $my_game_list = $('#dashboard_my_games');
    if ($my_game_list.length > 0) {
        //render games list on dashboard.
        React.render(
            <GameList games={myGames} gameDispatcher={myGameDispatcher} listType="created_or_joined" />,
            $my_game_list[0]
        );
    }
}