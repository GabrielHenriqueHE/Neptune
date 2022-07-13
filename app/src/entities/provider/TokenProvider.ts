import { sign } from "jsonwebtoken";

import config from "../../../bin/configs/config.json";
import mongoose from "../../../bin/configs/database";
import { IRefreshToken } from "../interfaces/IRefreshToken";
import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";


export class TokenProvider {

    constructor (
        private refreshTokenRepository: IRefreshTokenRepository
    ){}
    
    async generateToken(userId: string): Promise<string> {
        return sign({}, config.secret, {
            subject: userId,
            expiresIn: "1h"
        })
    }

    async generateRefreshToken(userId: string): Promise<mongoose.HydratedDocument<IRefreshToken> | null> {
        return await this.refreshTokenRepository.create(userId);
    }
}   