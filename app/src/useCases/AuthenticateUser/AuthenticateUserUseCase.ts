import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IAuthRequest } from "../../entities/interfaces/IAuthRequest";
import { IUserRepository } from "../../entities/repositories/IUserRepository";

import config from "../../../bin/configs/config.json";

export class AuthenticateUserUseCase {

    constructor (
        private userRepository: IUserRepository
    ){}

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