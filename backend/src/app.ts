import { envs } from "./config/envs"
import { MongoDatabase } from "./data/mongo-database"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"





async function main () {

    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
    server.start()
}

( async () => {
    main()
})()