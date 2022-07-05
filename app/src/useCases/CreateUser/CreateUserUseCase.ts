import { IUser } from "../../entities/interfaces/IUser";
import { IUserRepository } from "../../entities/repositories/IUserRepository";
import { CreateWalletUseCase } from "../CreateWallet/CreateWalletUseCase";

export class CreateUserUseCase {

    constructor (
        private UserRepository: IUserRepository,
        private createWalletUseCase: CreateWalletUseCase
    ){}

    async execute(data: Omit<IUser, "wallet" | "_id" | "createdAt" | "updatedAt">): Promise<void> {

        if (await this.UserRepository.findByEmail(data.email)) {
            throw new Error("User already exists");
        }

        const wallet = await this.createWalletUseCase.execute();

        await this.UserRepository.save({
            email: data.email,
            name: data.name,
            password: data.password,
            wallet: wallet
        })
        
    }   
}