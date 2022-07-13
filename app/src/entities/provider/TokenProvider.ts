import { sign } from "jsonwebtoken";

import config from "../../../bin/configs/config.json";
import mongoose from "../../../bin/configs/database";
import { IRefreshToken } from "../interfaces/IRefreshToken";
import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";


export class TokenProvider {

    constructor (
        private refreshTokenRepository: IRefreshTokenRepository
    ){}

    /* 
    *   Receives userId and generate a new JWT using it as subject
    *   By default, access tokens is 1 hour long
    * 
    *   Returns: Promise<string>
    */
    
    async generateToken(userId: string): Promise<string> {
        return sign({}, config.secret, {
            subject: userId,
            expiresIn: "1h"
        })
    }

    /*
    *   Receives userId and tells refresh token repository to generate a new refresh token
    *   
    *   Returns: Promise<mongoose.HydratedDocument | null>
    */
    
    async generateRefreshToken(userId: string): Promise<mongoose.HydratedDocument<IRefreshToken> | null> {
        return await this.refreshTokenRepository.create(userId);
    }
}   