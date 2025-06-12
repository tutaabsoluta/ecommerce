import express from 'express'
import { envs } from '../config/envs'

export class Server{


    constructor(
        private readonly port: number,
        private readonly app = express(),
    ) {
        this.port = port
    }


    async start() {
        
    

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`)
        } )
    }

}