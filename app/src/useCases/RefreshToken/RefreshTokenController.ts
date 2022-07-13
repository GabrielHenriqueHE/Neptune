import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


export class RefreshTokenController {

    constructor (
        private refreshTokenUseCase: RefreshTokenUseCase
    ){}

    /*
    * Receive a Request and Response interface
    * It tries to execute the refreshTokenUseCase and returns a new token
    * If it goes wrong, returns an "error" message
    * 
    * Returns: Promise<Response>
    */

    async handle(req: Request, res: Response): Promise<Response> {
        const { refreshToken } = req.body;        

        try {
            const token = await this.refreshTokenUseCase.execute(refreshToken);

            return res.status(201).json(token)
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({ error })
        }
    }
}