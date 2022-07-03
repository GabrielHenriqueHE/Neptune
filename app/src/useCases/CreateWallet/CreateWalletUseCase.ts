import mongoose from "../../../bin/configs/database";
import { IWallet } from "../../entities/interfaces/IWallet";
import { IWalletRepository } from "../../entities/repositories/IWalletRepository";

export class CreateWalletUseCase {

    constructor (
        private repository: IWalletRepository
    ){}

    async execute(): Promise<mongoose.HydratedDocument<IWallet>> {
        const newWallet = await this.repository.create();
        return newWallet;
    }
}