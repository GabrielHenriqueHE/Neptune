import mongoose from "../../../bin/configs/database";
import { IRefreshToken } from "../interfaces/IRefreshToken";

const RefreshTokenSchema = new mongoose.Schema<Omit<IRefreshToken, "_id">>({
    expiresIn: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export default RefreshTokenSchema;