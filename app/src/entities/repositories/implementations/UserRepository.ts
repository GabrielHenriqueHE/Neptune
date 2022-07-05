import mongoose from "mongoose";

import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";


export class UserRepository implements IUserRepository {

    constructor (
        private repository: mongoose.Model<Omit<IUser, "_id" | "createdAt" | "updatedAt">>
    ){}
    
    async findByEmail(email: string): Promise<any> {
        const userAlreadyExists = await this.repository.findOne({ email: email });

        return userAlreadyExists;        
    }

    async save(data: Omit<IUser, "_id" | "createdAt" | "updatedAt">): Promise<void> {
        await this.repository.create(data);
    }

}