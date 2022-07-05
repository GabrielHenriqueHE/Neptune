import bcrypt from "bcrypt";

import mongoose from "../../../bin/configs/database";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema<Omit<IUser, "_id" | "createdAt" | "updatedAt">>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    wallet: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'wallets'
    }
}, { timestamps: true });

UserSchema.pre("save", async function() {
    const encryptedPassword = await bcrypt.hash(this.password, 10);
    this.password = encryptedPassword;
})

export default UserSchema;