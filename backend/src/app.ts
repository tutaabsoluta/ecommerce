import { envs } from "./config/envs"
import { Server } from "./presentation/server"





function main () {
    const server = new Server( envs.PORT )
    server.start()
}

( () => {
    main()
})()