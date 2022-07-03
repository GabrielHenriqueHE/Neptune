import mongoose from "../../../bin/configs/database";
import { IWallet } from "../interfaces/IWallet";

export interface IWalletRepository {
    create(): Promise<mongoose.HydratedDocument<IWallet>>
}