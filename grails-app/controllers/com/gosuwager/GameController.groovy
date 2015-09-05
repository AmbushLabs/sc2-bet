package com.gosuwager

import grails.converters.JSON

class GameController {

    static allowedMethods = [
        index:['GET', 'POST', 'DELETE'],
        list:['GET'],
        create:['GET']
    ]

    def index() {
        if (request.method == 'GET' && params.game_id) {
            //either get a specific game
            Game g = Game.findById(params.game_id);
            if (g != null) {
                render g as JSON;
            } else {
                def tmp = [error:'error'];
                render tmp as JSON;
            }
        } else if (request.method == 'POST') {
            //create a game
            def u = User.findById(session.user_id);
            Game g = new Game([
                creator: u,
                tokenWager: params.wager
            ]);
            g.save(flush:true);
            render Game.findAll([max:10, sort:"createDate", order:"desc"]) as JSON;
        } else if (request.method == 'PUT') {
            //update a game
            //lets leave this not implemented
        } else if (request.method == 'DELETE') {
            //delete a game

        }
    }

    def create() {

    }

    def list() {
        render Game.findAll([max:10, sort:"createDate", order:"desc"]) as JSON;
    }
}
