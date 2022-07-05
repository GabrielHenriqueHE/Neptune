import mongoose from "../../../bin/configs/database";
import { IWalletRepository } from "../../entities/repositories/IWalletRepository";

export class CreateWalletUseCase {

    constructor (
        private WalletRepository: IWalletRepository
    ){}

    /* 
    * When called, tells repository to create a new wallet and return its _id
    * 
    * Returns: mongoose.Types.ObjectId
    */
    
    async execute(): Promise<mongoose.Types.ObjectId> {
        return await this.WalletRepository.create()
    }
    
}