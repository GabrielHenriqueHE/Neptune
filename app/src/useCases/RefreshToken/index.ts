import { TokenProvider } from "../../entities/provider/TokenProvider";
import RefreshTokenModel from "../../entities/models/RefreshTokenModel";
import { RefreshTokenRepository } from "../../entities/repositories/implementations/RefreshTokenRepository";

import { RefreshTokenController } from "./RefreshTokenController";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

const refreshTokenRepository = new RefreshTokenRepository(RefreshTokenModel);
const tokenProvider = new TokenProvider(refreshTokenRepository);

const refreshTokenUseCase = new RefreshTokenUseCase(tokenProvider, refreshTokenRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

export { refreshTokenUseCase, refreshTokenController };