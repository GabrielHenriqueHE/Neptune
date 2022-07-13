import mongoose from "../../../../bin/configs/database";
import dayjs from "dayjs";

import { IRefreshToken } from "../../interfaces/IRefreshToken";
import { IRefreshTokenRepository } from "../IRefreshTokenRepository";


export class RefreshTokenRepository implements IRefreshTokenRepository{

    constructor (
        private repository: mongoose.Model<Omit<IRefreshToken, "_id">>
    ){}

    async create(userId: string): Promise<mongoose.HydratedDocument<IRefreshToken, any, any> | null> {
        const expiresIn = dayjs().add(24, "hour").unix();
        
        try {
            const refreshToken = await this.repository.create({
                expiresIn: expiresIn,
                userId: userId
            })
    
            return refreshToken;
        } catch (error) {
            console.log("An unexpected error has occurred")
        }
    }

    async deleteMany(userId: string): Promise<void> {
        await this.repository.deleteMany({
            userId: userId
        })
    }

    async find(refreshToken: string): Promise<mongoose.HydratedDocument<IRefreshToken, any, any> | null> {
        try {
            const token = await this.repository.findById(refreshToken);
            
            if (!token) {
                throw new Error("Invalid refresh token provided");
            }
    
            return token;
        } catch (error) {
            console.log("Refresh token id is malformatted or refresh token doesn't exists")
        }
    }
}