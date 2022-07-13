import dayjs from "dayjs";
import config from "../../../bin/configs/config.json";
import { TokenProvider } from "../../entities/provider/TokenProvider";
import { IRefreshTokenRepository } from "../../entities/repositories/IRefreshTokenRepository";

export class RefreshTokenUseCase {
    
    constructor (
        private tokenProvider: TokenProvider,
        private refreshTokenRepository: IRefreshTokenRepository
    ){}

    /*
    *   Receives refreshToken and tells refreshTokenRepository to search for it in collection
    *   If it doesn't exists, it throw a new error
    *   Else, it generate a new token
    * 
    *   It checks if refresh token provided is expired.
    *   If refresh token provided is expired, it tells to refreshTokenRepository to
    *   delete it and others expired refresh tokens that contains userId.
    *   After delete, it tells to tokenProvider to generate a new refresh token and
    *   returns newToken and newRefreshToken.
    *   
    *   Else, it retuns only the new token.
    * 
    *   Returns: Promise<string | Object>
    */
    
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
    
            return newToken;
            
        } catch (error) {
            throw new Error("An unexpected error has occurred");
        }

    }
}