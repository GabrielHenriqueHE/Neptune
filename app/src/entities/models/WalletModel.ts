import mongoose from "../../../bin/configs/database";

import WalletSchema from "../schemas/WalletSchema";
import { IWallet } from "../interfaces/IWallet";

const WalletModel = mongoose.model<Omit<IWallet, "_id" | "createdAt" | "updatedAt">>("wallets", WalletSchema);

export default WalletModel;