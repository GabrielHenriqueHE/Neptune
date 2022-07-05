import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IAuthRequest } from "../../entities/interfaces/IAuthRequest";
import { IUserRepository } from "../../entities/repositories/IUserRepository";

import config from "../../../bin/configs/config.json";

export class AuthenticateUserUseCase {

    constructor (
        private userRepository: IUserRepository
    ){}

    /*
    * Receive an email and password and tells userRepository to check if user exists
    * If user doesn't exists, it throw a new error alerting that data must be wrong
    * Else, it compare the password received with user password
    * If passwords doesn't matches, it throw a new error alerting that data must be wrong
    * Else, it generate a new token as string and returns it
    * 
    * Returns: string 
    */

    async execute({ email, password }: IAuthRequest): Promise<string> {
        
        const userAlreadyExists = await this.userRepository.authenticate(email);

        if (!userAlreadyExists) {
            throw new Error("Incorrect user or password.");
        }

        const passwordMatch = await compare(password, userAlreadyExists.password)
        
        if (!passwordMatch) {
            throw new Error("Incorrect user or password.");
        }

        const token = sign({}, config.secret, {
            subject: userAlreadyExists.id,
            expiresIn: "50s"
        })

        return token;
        
    }
}