import UserModel from "../../entities/models/UserModel";
import { UserRepository } from "../../entities/repositories/implementations/UserRepository";

const userRepository = new UserRepository(UserModel);

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

import { AuthenticateUserController } from "./AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserUseCase, authenticateUserController };