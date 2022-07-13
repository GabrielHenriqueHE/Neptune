import mongoose from "../../../bin/configs/database";

import { IRefreshToken } from "../interfaces/IRefreshToken";
import RefreshTokenSchema from "../schemas/RefreshTokenSchema";

const RefreshTokenModel = mongoose.model<Omit<IRefreshToken, "_id">>('refreshTokens', RefreshTokenSchema);

export default RefreshTokenModel;