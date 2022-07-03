import mongoose from "../../../bin/configs/database";
import { IWallet } from "../interfaces/IWallet";

const WalletSchema = new mongoose.Schema<Omit<IWallet, "_id" | "createdAt" | "updatedAt">>({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    movements: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'movements'
    }]
});

export default WalletSchema;