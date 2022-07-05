import UserModel from "../../entities/models/UserModel";
import { UserRepository } from "../../entities/repositories/implementations/UserRepository";

const userRepository = new UserRepository(UserModel);

import WalletModel from "../../entities/models/WalletModel";
import { WalletRepository } from "../../entities/repositories/implementations/WalletRepository";

const walletRepository = new WalletRepository(WalletModel)

import { CreateWalletUseCase } from "../CreateWallet/CreateWalletUseCase";

const createWalletUseCase = new CreateWalletUseCase(walletRepository)

import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const createUserUseCase = new CreateUserUseCase(userRepository, createWalletUseCase)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController };