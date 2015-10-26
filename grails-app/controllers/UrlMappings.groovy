class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller:"main", action:"index")
        "/gosucoins"(controller:"main", action:"index")

        "/login"(controller:"main", action:"login")

        "/game/create"(controller:"game", action:"create")
        "/game/$game_id/join"(controller:"game", action:"join")
        "/game/$game_id/accept"(controller:"game", action:"accept")
        "/game/$game_id/reject"(controller:"game", action:"reject")
        "/game/g/$game_id"(controller:"game", action:"index")

        "/w/$game_id" (controller:"game", action:"permalink")

        "/game/list/$list_type"(controller:"game", action:"list")

        "/player/$player_id"(controller:"player", action:"index")


        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
