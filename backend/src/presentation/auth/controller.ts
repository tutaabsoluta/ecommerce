import { Request, Response } from "express"



export class AuthController {


    constructor() {}


    loginUser = ( req: Request, res: Response ) => {
        res.json('Desde login')
        console.log('login')
    }

    registerUser = ( req: Request, res: Response ) => {
        res.json('Desde register')
    }

}