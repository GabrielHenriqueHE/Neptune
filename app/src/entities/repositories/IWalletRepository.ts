import mongoose from "../../../bin/configs/database";

export interface IWalletRepository {
    create(): Promise<mongoose.Types.ObjectId>
}