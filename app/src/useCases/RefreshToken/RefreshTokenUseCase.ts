import dayjs from "dayjs";
import config from "../../../bin/configs/config.json";
import { TokenProvider } from "../../entities/provider/TokenProvider";
import { IRefreshTokenRepository } from "../../entities/repositories/IRefreshTokenRepository";

export class RefreshTokenUseCase {
    
    constructor (
        private tokenProvider: TokenProvider,
        private refreshTokenRepository: IRefreshTokenRepository
    ){}

    async execute(refreshToken: string): Promise<string | Object> {

        try {
            const token = await this.refreshTokenRepository.find(refreshToken);
    
            if (!token) {
                throw new Error("Invalid refresh token provided");
            }
    
            const newToken = await this.tokenProvider.generateToken(token.userId.toString());
            
            if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
                await this.refreshTokenRepository.deleteMany(token.userId.toString());
    
                const newRefreshToken = await this.tokenProvider.generateRefreshToken(token.userId.toString());
    
                return { newToken, newRefreshToken }
            }
    
            return { newToken }
            
        } catch (error) {
            throw new Error("")
        }

    }
}