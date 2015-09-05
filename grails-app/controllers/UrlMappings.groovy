class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller:"main", action:"index")
        "/login"(controller:"main", action:"login")

        "/game/create"(controller:"game", action:"create")
        "/game/g/$game_id"(controller:"game", action:"index")


        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
