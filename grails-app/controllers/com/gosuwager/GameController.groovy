package com.gosuwager

import com.gosuwager.bnet.SC2Character
import com.gosuwager.marshallers.Rank
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
                def replayQuery = GameReplay.where {
                    game == g
                };
                ret['game_replay'] = replayQuery.find(sort:"createDate", order:"desc");
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
                    gosuCoin        : params.wager,
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
            if (g.player1.id != session.user_id) {
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

    def leave() {
        if (request.method == 'POST' && params.game_id) {
            def ret = [:];
            Game g = Game.findById(params.game_id);
            if (!g.active) {
                ret['error'] = true;
                ret['error_reason'] = 'game_gone';
            } else if (
                (g.player1 && g.player1.id == session.user_id && !g.isPrivate) ||
                (g.player2 && g.player2.id == session.user_id)
            ) {
                if (g.player1.id == session.user_id) {
                    if (g.player2) {
                        g.player1 = g.player2;
                        g.player2 = null;
                    } else {
                        g.player1 = null;
                    }
                } else if (g.player2.id == session.user_id) {
                    g.player2 = null;
                }
                if (g.player1 == null && g.player2 == null) {
                    //need to kill this things
                    g.active = false;
                    g.rank = null;
                }

                if (g.save(flush:true)) {
                    def u = User.findById(session.user_id);
                    //SendEmailService.send(u, "player-left-contest", g);
                    ret['game'] = g;
                    ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);
                }
            } else {
                if (g.isPrivate && g.player1 && g.player1.id == session.user_id) {
                    ret['error'] = true;
                    ret['error_reason'] = 'your_private_game';
                } else {
                    ret['error'] = true;
                    ret['error_reason'] = 'not_your_game';
                }
            }
            render ret as JSON;
        }
    }

    def join() {
        if (request.method == 'POST' && params.game_id) {
            def ret = [:];
            if (session.user_id) {
                Game g = Game.findById(params.game_id);
                if (!g.active) {
                    ret['error'] = true;
                    ret['error_reason'] = 'game_gone';
                } else if (g.player1 && g.player1.id == session.user_id) {
                    ret['error'] = true;
                    ret['error_reason'] = 'your_game';
                } else if (g.player2 != null) {
                    ret['error'] = true;
                    ret['error_reason'] = 'challenger_exists';
                } else {
                    User u = User.findById(session.user_id);
                    if (GosuCoinService.canUserCreateOrJoinGame(u, g)) {
                        def emailTypes = [];
                        if (!g.player1) {
                            g.player1 = u;
                            def character = u.battleNetAccount.characters.first();
                            if (character.currentSeason && character.currentSeason.league != null) {
                                g.rank = Rank.rankToInteger(character.currentSeason.league);
                            } else if (character.previousSeason && character.previousSeason.league != null) {
                                g.rank = Rank.rankToInteger(character.previousSeason.league);
                            } else {
                                g.rank = Rank.rankToInteger(character.highest1v1Rank);
                            }
                            emailTypes = [[template: 'player-1-joined-empty-conest', user: g.player1]];
                        } else if (!g.player2) {
                            g.player2 = u;
                            emailTypes = [
                                [template: 'player-2-joined-contest', user: g.player2],
                                [template: 'notify-player-1-player-2-joined-contest', user: g.player1]
                            ];
                        }

                        if (g.save(flush:true)) {
                            emailTypes.each {
                                SendEmailService.send(it.user, it.template, g);
                            }
                        } else {
                            println g.errors;
                        }
                        ret['game'] = g;
                        ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);
                    } else {
                        ret['error'] = true;
                        ret['error_reason'] = 'not_enough_coins';
                    }
                }

            } else {
                ret['error'] = true;
                ret['error_reason'] = 'not_logged_in';
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
            } else if (g.player1.id != session.user_id) {
                ret['error'] = true;
                ret['error_reason'] = 'not_creator';
            } else if (g.player2 == null) {
                ret['error'] = true;
                ret['error_reason'] = 'no_challenger';
            } else if (g.challengerAccepted) {
                ret['error'] = true;
                ret['error_reason'] = 'already_accepted';
            } else {
                g.challengerAccepted = true;
                g.challengerAcceptedDate = new Date();
                if (g.save(flush:true)) {
                    SendEmailService.send(g.player2, 'creator-accepted-challenge', g);
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
            } else if (g.player1.id != session.user_id) {
                ret['error'] = true;
                ret['error_reason'] = 'not_creator';
            } else if (g.player2 == null) {
                ret['error'] = true;
                ret['error_reason'] = 'no_challenger';
            } else if (g.challengerAccepted) {
                ret['error'] = true;
                ret['error_reason'] = 'already_accepted';
            } else {
                g.player2 = null;
                g.challengerAccepted = false;
                if (g.save(flush:true)) {
                    SendEmailService.send(g.player2, 'creator-rejected-challenger', g);
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
                    active == true && (player1 == u || player2 == u)
                }
                ret['games'] = query.list(max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc");
                ret['count'] = query.count();
            } else if (params.list_type == 'created') {
                ret['games'] = Game.findAllByActiveAndPlayer1(true, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
                ret['count'] = Game.countByActiveAndPlayer1(true, u);
            } else if (params.list_type == 'joined') {
                ret['games'] = Game.findAllByActiveAndPlayer2(true, u, [max: limit, offset:(page-1)*limit, sort: "createDate", order: "desc"]);
                ret['count'] = Game.countByActiveAndPlayer2(true, u);
            } else if (params.list_type == 'to_approve') {
                ret['games'] = Game.findAllByActiveAndPlayer1AndChallengerAcceptedAndPlayer2IsNotNull(true, u, false, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
                ret['count'] = Game.countByActiveAndPlayer1AndChallengerAcceptedAndPlayer2IsNotNull(true, u, false);
            } else if (params.list_type == 'search') {
                ret['games'] = Game.findAllByActiveAndChallengerAcceptedAndPlayer1NotEqual(true, false, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
                ret['count'] = Game.findAllByActiveAndChallengerAcceptedAndPlayer1NotEqual(true, false, u);
            }
        } else {
            ret['games'] = Game.findAllByActiveAndChallengerAcceptedAndPlayer1NotEqual(true, false, u, [max:limit, offset:(page-1)*limit, sort:"createDate", order:"desc"]);
            ret['count'] = Game.countByActiveAndChallengerAcceptedAndPlayer1NotEqual(true, false, u);
        }
        ret['limit'] = limit;
        ret['page'] = page;
        render ret as JSON;
    }

    def replayInfo() {
        def ret = [:]
        if (request.method == 'GET' && params.game_id) {
            //either get a specific game
            User u = User.findById(session.user_id);
            Game g = Game.findById(params.game_id);
            if (g != null) {
                def replayQuery = GameReplay.where {
                    game == g
                };
                ret['game_replay'] = replayQuery.find(sort: "createDate", order: "desc");
                ret['game'] = g;
                ret['status'] = 'success';
                ret['gosu_coins'] = GosuCoinService.getGosuCoinReturnMap(u);
                render ret as JSON;
            } else {
                ret['error'] = true;
                ret['status'] = 'error';
                render ret as JSON;
            }
        }
        render ret as JSON;
    }

    def completeUpload() {

        if (params.key && params.bucket && session.user_id) {
            User u = User.findById(session.user_id);
            def fullPath = params.key;
            def explodedPath = fullPath.split("/");
            def gameId = Integer.valueOf(explodedPath[1]);
            def game = Game.findById(gameId);
            GameReplay gr = new GameReplay(
                replayName: explodedPath[2],
                replayFullPath: fullPath,
                bucket: params.bucket,
                etag: params.etag,
                game: game,
                user: u
            );
            if (gr.save()) {

            } else {
                println gr.errors;
            }

            render 'hi';
        }
    }
}
