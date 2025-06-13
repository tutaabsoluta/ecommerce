import express, { Router } from 'express'
import { envs } from '../config';
import cors, { CorsOptions} from 'cors'



interface Options {
    port: number,
    routes: Router,
}

export class Server {

    private readonly app = express();

    private readonly routes: Router
    private readonly port: number

    constructor(
        options: Options
    ) {

        const { port, routes } = options;
        this.port = port
        this.routes = routes
    }


    async start() {

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //CORS
        this.app.use( cors( this.corsOptions ) )

        this.app.use(this.routes);


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

    private corsOptions: CorsOptions = {
        origin: function (origin, callback) {
            if (!origin || envs.FRONTEND_URL) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

}