import mongoose from "../../../bin/configs/database";
import { IRefreshToken } from "../interfaces/IRefreshToken";

export interface IRefreshTokenRepository {
    find(refreshToken: string): Promise<mongoose.HydratedDocument<IRefreshToken> | null>;
    create(userId: string): Promise<mongoose.HydratedDocument<IRefreshToken> | null>;
    deleteMany(userId: string): Promise<void>
}