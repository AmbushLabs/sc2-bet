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
                tokenWager: params.wager,
                challengerAccepted: false,
                active: true
            ]);
            g.save(flush:true);
            render Game.findAllByActive(true, [max:10, sort:"createDate", order:"desc"]) as JSON;
        } else if (request.method == 'PUT') {
            //update a game
            //lets leave this not implemented
        } else if (request.method == 'DELETE' && params.game_id) {
            //delete a game
            Game g = Game.findById(params.game_id);
            def ret = [:];
            if (g.creator.id != session.user_id) {
                ret['error'] = 'You have to have created the wager to cancel it.'
            } else {
                g.active = false;
                g.save();
                ret['game'] = g;
            }
            render ret as JSON;
        }
    }

    def create() {

    }

    def join() {
        if (request.method == 'POST' && params.game_id) {
            def ret = [:];
            Game g = Game.findById(params.game_id);
            if (!g.active) {
                ret['error'] = 'Game no longer exists.';
            } else if (g.creator.id == session.user_id) {
                ret['error'] = 'Can\'t join your own games.';
            } else if (g.challenger != null) {
                ret['error'] = 'Game already has challenger.';
            } else {
                User u = User.findById(session.user_id);
                g.challenger = u;
                g.save();
                ret['game'] = g;
            }
            render ret as JSON;
        }
    }

    def accept() {
        if (request.method == 'POST' && params.game_id) {
            def ret = [:];
            Game g = Game.findById(params.game_id);
            if (!g.active) {
                ret['error'] = 'Game no longer exists.';
            } else if (g.creator.id != session.user_id) {
                ret['error'] = 'You can\'t accept challengers if you aren\'t the creator';
            } else if (g.challenger == null) {
                ret['error'] = 'You need a challenger to accept.';
            } else if (g.challengerAccepted) {
                ret['error'] = 'Challenger already accepted';
            } else {
                g.challengerAccepted = true;
                g.save();
                ret['game'] = g;
            }
            render ret as JSON;
        }
    }

    def reject() {
        if (request.method == 'POST' && params.game_id) {
            def ret = [:];
            Game g = Game.findById(params.game_id);
            if (!g.active) {
                ret['error'] = 'Game no longer exists.';
            } else if (g.creator.id != session.user_id) {
                ret['error'] = 'You can\'t reject challengers if you aren\'t the creator';
            } else if (g.challenger == null) {
                ret['error'] = 'You need a challenger to reject.';
            } else if (g.challengerAccepted) {
                ret['error'] = 'Challenger already accepted.';
            } else {
                g.challenger = null;
                g.challengerAccepted = false;
                g.save();
                ret['game'] = g;
            }
            render ret as JSON;
        }
    }

    def list() {
        User u = User.findById(session.user_id);
        if (params.list_type) {
            if (params.list_type == 'created_or_joined') {
                def query = Game.where {
                    active == true && (creator == u || challenger == u)
                }
                render query.list(max:5, sort:"createDate", order:"desc") as JSON;
            } else if (params.list_type == 'created') {
                render Game.findAllByActiveAndCreator(true, u, [max:5, sort:"createDate", order:"desc"]) as JSON;
            } else if (params.list_type == 'joined') {
                render Game.findAllByActiveAndChallenger(true, u, [max:5, sort:"createDate", order:"desc"]) as JSON;
            } else if (params.list_type == 'search') {
                render Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u, [max:10, sort:"createDate", order:"desc"]) as JSON;
            }
        } else {
            render Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u, [max:10, sort:"createDate", order:"desc"]) as JSON;
        }
    }
}
