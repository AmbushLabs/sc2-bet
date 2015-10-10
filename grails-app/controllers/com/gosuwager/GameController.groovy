package com.gosuwager

import com.gosuwager.bnet.SC2Character
import grails.converters.JSON

class GameController {

    static allowedMethods = [
        index:['GET', 'POST', 'DELETE'],
        list:['GET'],
        create:['GET']
    ]

    def permalink() {
        def user = User.findById(session.user_id?:0);
        def characterName = '';
        if (user) {
            SC2Character sc2Char = user.battleNetAccount.characters.getAt(0);
            characterName = sc2Char.displayName;
        }
        [
                logged_in: (user != null) ? true : false,
                character_name: characterName
        ]
    }

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
            def ret = [:]
            if (u) {
                Game g = new Game([
                        creator           : u,
                        tokenWager        : params.wager,
                        challengerAccepted: false,
                        active            : true
                ]);
                if (!g.save(flush: true)) {
                    println g.errors;
                    ret['error'] = true;
                }
                ret['game'] = g;
            } else {
                ret['error'] = true;
            }

            render ret as JSON;
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

    def all() {
        User u = User.findById(session.user_id);
        def ret = [:];
        ret['games'] = [:];
        ret['games']['my_games'] = [:];
        ret['games']['search_games'] = [:];
        def limit = Integer.valueOf(params.limit?:4);
        def page = Integer.valueOf(params.page?:1);
        def query = Game.where {
            active == true && (creator == u || challenger == u)
        }
        def created_or_joined = query.list(max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc");
        def created_or_joined_count = query.count();

        def created = Game.findAllByActiveAndCreator(true, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
        def created_count = Game.countByActiveAndCreator(true, u);

        def joined = Game.findAllByActiveAndChallenger(true, u, [max: limit, offset:(page-1)*limit, sort: "createDate", order: "desc"]);
        def joined_count = Game.countByActiveAndChallenger(true, u);

        def to_approve = Game.findAllByActiveAndCreatorAndChallengerAcceptedAndChallengerIsNotNull(true, u, false, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
        def to_approve_count = Game.countByActiveAndCreatorAndChallengerAcceptedAndChallengerIsNotNull(true, u, false);

        def search = Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
        def search_count = Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u);

        (created_or_joined + created + joined + to_approve).each { g ->
            ret['games']['my_games'][g.id] = g;
        }
        search.each { g->
            ret['games']['search_games'][g.id] = g;
        }

        ret['games']['created_or_joined'] = [:]
        ret['games']['created_or_joined']['ids'] = created_or_joined.collect { it.id };
        ret['games']['created_or_joined']['count'] = created_or_joined_count;

        ret['games']['created'] = [:]
        ret['games']['created']['ids'] = created.collect { it.id };
        ret['games']['created']['count'] = created_count;

        ret['games']['joined'] = [:]
        ret['games']['joined']['ids'] = joined.collect { it.id };
        ret['games']['joined']['count'] = joined_count;

        ret['games']['to_approve'] = [:]
        ret['games']['to_approve']['ids'] = to_approve.collect { it.id };
        ret['games']['to_approve']['count'] = to_approve_count;

        ret['games']['search'] = [:]
        ret['games']['search']['ids'] = search.collect { it.id };
        ret['games']['search']['count'] = search_count;

        render ret as JSON;
    }

    def list() {
        User u = User.findById(session.user_id);
        def ret = [:];
        def limit = Integer.valueOf(params.limit?:4);
        def page = Integer.valueOf(params.page?:1);
        if (params.list_type) {
            if (params.list_type == 'created_or_joined') {
                def query = Game.where {
                    active == true && (creator == u || challenger == u)
                }
                ret['games'] = query.list(max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc");
                ret['count'] = query.count();
            } else if (params.list_type == 'created') {
                ret['games'] = Game.findAllByActiveAndCreator(true, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
                ret['count'] = Game.countByActiveAndCreator(true, u);
            } else if (params.list_type == 'joined') {
                ret['games'] = Game.findAllByActiveAndChallenger(true, u, [max: limit, offset:(page-1)*limit, sort: "createDate", order: "desc"]);
                ret['count'] = Game.countByActiveAndChallenger(true, u);
            } else if (params.list_type == 'to_approve') {
                ret['games'] = Game.findAllByActiveAndCreatorAndChallengerAcceptedAndChallengerIsNotNull(true, u, false, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
                ret['count'] = Game.countByActiveAndCreatorAndChallengerAcceptedAndChallengerIsNotNull(true, u, false);
            } else if (params.list_type == 'search') {
                ret['games'] = Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
                ret['count'] = Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u);
            }
        } else {
            ret['games'] = Game.findAllByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
            ret['count'] = Game.countByActiveAndChallengerAcceptedAndCreatorNotEqual(true, false, u);
        }
        ret['limit'] = limit;
        ret['page'] = page;
        render ret as JSON;
    }
}
