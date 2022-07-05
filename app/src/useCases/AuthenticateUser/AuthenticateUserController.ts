import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


export class AuthenticateUserController {

    constructor (
        private authenticateUserUseCase: AuthenticateUserUseCase
    ){}

    /*
    * Receive arguments as Request and Response
    * It get email and password from request body and use it to authenticate
    * 
    * Returns: Response
    */
    
    async handle(req: Request, res: Response): Promise<Response> {
        
        const { email, password } = req.body;
        
        const token = await this.authenticateUserUseCase.execute({ email, password });

        return res.status(200).json(token)
        
    }
}