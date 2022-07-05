import mongoose from "mongoose";

import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";


export class UserRepository implements IUserRepository {

    constructor (
        private repository: mongoose.Model<Omit<IUser, "_id" | "createdAt" | "updatedAt">>
    ){}
    
    async findByEmail(email: string): Promise<mongoose.HydratedDocument<IUser, any, any> | null> {
        const userAlreadyExists = await this.repository.findOne({ email: email });

        return userAlreadyExists;        
    }

    async authenticate(email: string): Promise<mongoose.HydratedDocument<IUser, any, any> | null> {
        const authenticatedUser = await this.repository.findOne({ email: email }).select("+password");

        return authenticatedUser;
    };

    async save(data: Omit<IUser, "_id" | "createdAt" | "updatedAt">): Promise<void> {
        await this.repository.create(data);
    }

}