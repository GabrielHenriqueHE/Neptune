import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import config from "../../../bin/configs/config.json"; 


export class EnsureAuthenticatedUseCase {

    async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res.status(401).json({ message: "No token provided" });
        }

        const [, token] = authToken.split(" ");

        try {
            verify(token, config.secret);

            return next();
        } catch (error) {
            return res.status(401).json({ message: error })
        }
    }
}