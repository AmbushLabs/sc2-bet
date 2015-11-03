package com.gosuwager

import com.gosuwager.bnet.SC2Character
import grails.converters.JSON

class GameController {

    def SendEmailService;
    def GosuCoinService;

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
            def ret = [:]
            if (g != null) {
                ret['game'] = g;
                ret['status'] = 'success';
                render ret as JSON;
            } else {
                ret['error'] = true;
                ret['status'] = 'error';
                render ret as JSON;
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
                if (GosuCoinService.canUserCreateOrJoinGame(u, g)) {
                    if (!g.save(flush: true)) {
                        ret['error'] = true;
                    } else {
                        SendEmailService.send(u, 'wager-created', g);
                    }
                    ret['game'] = g;
                    ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);
                } else {
                    ret['error'] = true;
                    ret['error_reason'] = 'not_enough_coins';
                }
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
                ret['error'] = true;
                ret['error_reason'] = 'not_creator';
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
                ret['error'] = true;
                ret['error_reason'] = 'game_gone';
            } else if (g.creator.id == session.user_id) {
                ret['error'] = true;
                ret['error_reason'] = 'your_game';
            } else if (g.challenger != null) {
                ret['error'] = true;
                ret['error_reason'] = 'challenger_exists';
            } else {
                User u = User.findById(session.user_id);
                if (GosuCoinService.canUserCreateOrJoinGame(u, g)) {
                    g.challenger = u;
                    if (g.save()) {
                        SendEmailService.send(u, 'challenger-joined-wager', g);
                    }
                    ret['game'] = g;
                    ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);
                } else {
                    ret['error'] = true;
                    ret['error_reason'] = 'not_enough_coins';
                }
            }
            render ret as JSON;
        }
    }

    def accept() {
        if (request.method == 'POST' && params.game_id) {
            def ret = [:];
            Game g = Game.findById(params.game_id);
            if (!g.active) {
                ret['error'] = true;
                ret['error_reason'] = 'game_gone';
            } else if (g.creator.id != session.user_id) {
                ret['error'] = true;
                ret['error_reason'] = 'not_creator';
            } else if (g.challenger == null) {
                ret['error'] = true;
                ret['error_reason'] = 'no_challenger';
            } else if (g.challengerAccepted) {
                ret['error'] = true;
                ret['error_reason'] = 'already_accepted';
            } else {
                g.challengerAccepted = true;
                if (g.save()) {
                    SendEmailService.send(g.challenger, 'creator-accepted-challenge', g);
                }
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
                ret['error'] = true;
                ret['error_reason'] = 'game_gone';
            } else if (g.creator.id != session.user_id) {
                ret['error'] = true;
                ret['error_reason'] = 'not_creator';
            } else if (g.challenger == null) {
                ret['error'] = true;
                ret['error_reason'] = 'no_challenger';
            } else if (g.challengerAccepted) {
                ret['error'] = true;
                ret['error_reason'] = 'already_accepted';
            } else {
                g.challenger = null;
                g.challengerAccepted = false;
                if (g.save()) {
                    SendEmailService.send(g.challenger, 'creator-rejected-challenger', g);
                }
                ret['game'] = g;
            }
            render ret as JSON;
        }
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

    def completeUpload() {
        if (params.key && params.bucket) {
            def fullPath = params.key;
            def explodedPath = fullPath.split("/");
            def gameId = Integer.valueOf(explodedPath[1]);
            def game = Game.findById(gameId);
            GameReplay gr = new GameReplay(
                replayName: explodedPath[2],
                replayFullPath: fullPath,
                bucket: params.bucket,
                etag: params.etag,
                game: game
            );
            if (gr.save()) {


            } else {
                println gr.errors;
            }

            render 'hi';
        }
    }
}
