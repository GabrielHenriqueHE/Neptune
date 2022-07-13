import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import config from "../../../bin/configs/config.json"; 


export class EnsureAuthenticatedUseCase {

    /*
    * Receive Request, Response and NextFunction interfaces
    * It checks for authToken in authorization in request headers
    * If authToken doesn't exists, it returns a Response with
    * a http status 401 (unauthorized)
    * 
    * Else, it verifies token.
    * If token is expired, returns a http status 401.
    * Else, executes next function.
    * 
    * Returns: Promise<Response | void>
    */

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