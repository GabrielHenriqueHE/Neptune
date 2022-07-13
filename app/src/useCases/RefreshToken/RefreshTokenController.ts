import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


export class RefreshTokenController {

    constructor (
        private refreshTokenUseCase: RefreshTokenUseCase
    ){}

    async handle(req: Request, res: Response): Promise<Response | void> {
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