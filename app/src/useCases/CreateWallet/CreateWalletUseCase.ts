import mongoose from "../../../bin/configs/database";
import { IWalletRepository } from "../../entities/repositories/IWalletRepository";

export class CreateWalletUseCase {

    constructor (
        private WalletRepository: IWalletRepository
    ){}
    
    async execute(): Promise<mongoose.Types.ObjectId> {
        return await this.WalletRepository.create()
    }
    
}