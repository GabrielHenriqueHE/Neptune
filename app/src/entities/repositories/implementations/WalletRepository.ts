import mongoose from "../../../../bin/configs/database";

import { IWallet } from "../../interfaces/IWallet";
import { IWalletRepository } from "../IWalletRepository";

export class WalletRepository implements IWalletRepository {

    constructor (
        private repository: mongoose.Model<Omit<IWallet, "_id" | "updatedAt" | "createdAt">>
    ){}

    /*
    * Tells mongoose.Model to create a new document, without any data
    *
    * Returns: mongoose.Types.ObjectId
    */
    
    async create(): Promise<mongoose.Types.ObjectId> {
        const wallet = await this.repository.create({});
        return wallet._id;
    }
    
}