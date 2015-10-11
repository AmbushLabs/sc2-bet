package com.gosuwager

import com.gosuwager.bnet.SC2Character
import grails.converters.JSON

class MainController {

    def index() {
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

    def initialize() {
        def ret = [:];
        User u = User.findById(session.user_id);
        if (u == null) {
            ret['logged_in'] = false;
        } else {
            ret['logged_in'] = true;
            ret['user'] = u;
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
        }

        render ret as JSON;
    }
}
