import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain"



export class AuthController {


    constructor(
        public readonly authService: AuthService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })
    }


    loginUser = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.authService.loginUser(loginDto!)
            .then((user) => res.status(200).json(user))
            .catch((error) => this.handleError(error, res))


    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.authService.registerUser(registerDto!)
            .then((user) => res.status(200).json(user))
            .catch((error) => this.handleError(error, res))
    }

}