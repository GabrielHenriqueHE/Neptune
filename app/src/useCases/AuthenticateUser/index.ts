import UserModel from "../../entities/models/UserModel";
import { UserRepository } from "../../entities/repositories/implementations/UserRepository";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserController } from "./AuthenticateUserController";

import { TokenProvider } from "../../entities/provider/TokenProvider";
import RefreshTokenModel from "../../entities/models/RefreshTokenModel";
import { RefreshTokenRepository } from "../../entities/repositories/implementations/RefreshTokenRepository";

const userRepository = new UserRepository(UserModel);
const refreshTokenRepository = new RefreshTokenRepository(RefreshTokenModel)

const tokenProvider = new TokenProvider(refreshTokenRepository)

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, tokenProvider)
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserUseCase, authenticateUserController };