import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import config from "../../../bin/configs/config.json";
import { IAuthRequest } from "../../entities/interfaces/IAuthRequest";
import { IUserRepository } from "../../entities/repositories/IUserRepository";
import { TokenProvider } from "../../entities/provider/TokenProvider";

export class AuthenticateUserUseCase {

    constructor (
        private userRepository: IUserRepository,
        private TokenProvider: TokenProvider
    ){}

    /*
    * Receive an email and password and tells userRepository to check if user exists
    * If user doesn't exists, it throw a new error alerting that data must be wrong
    * Else, it compare the password received with user password
    * If passwords doesn't matches, it throw a new error alerting that data must be wrong
    * Else, it generate a new token as string and returns it
    * 
    * Returns: object { token, refreshToken } 
    */

    async execute({ email, password }: IAuthRequest): Promise<Object> {
        
        const user = await this.userRepository.authenticate(email);

        if (!user) {
            throw new Error("Incorrect user or password.");
        }

        const passwordMatch = await compare(password, user.password)
        
        if (!passwordMatch) {
            throw new Error("Incorrect user or password.");
        }

        const token = await this.TokenProvider.generateToken(user.id);
        const refreshToken = await this.TokenProvider.generateRefreshToken(user.id);

        return {
            token,
            refreshToken
        };
        
    }
}