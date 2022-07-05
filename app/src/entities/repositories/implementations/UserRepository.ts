import mongoose from "mongoose";

import { IUser } from "../../interfaces/IUser";
import { IUserRepository } from "../IUserRepository";


export class UserRepository implements IUserRepository {

    constructor (
        private repository: mongoose.Model<Omit<IUser, "_id" | "createdAt" | "updatedAt">>
    ){}

    /*
    * Tells to mongoose.Model to find one user document using email
    * If it exists, returns mongoose.HydratedDocument
    * Else, returns null
    * 
    * Returns: mongoose.HydratedDocument | null 
    */
    
    async findByEmail(email: string): Promise<mongoose.HydratedDocument<IUser, any, any> | null> {
        const userAlreadyExists = await this.repository.findOne({ email: email });

        return userAlreadyExists;        
    }

    /*
    * Tells mongoose.Model to find one user document using email and also select user password
    * If it exists, returns mongoose.HydratedDocument
    * Else, returns null
    * 
    * Returns: mongoose.HydratedDocument | null 
    */

    async authenticate(email: string): Promise<mongoose.HydratedDocument<IUser, any, any> | null> {
        const authenticatedUser = await this.repository.findOne({ email: email }).select("+password");

        return authenticatedUser;
    };

    /*
    * Tells to mongoose.Model to create a new document with data 
    *
    * Returns: void
    */

    async save(data: Omit<IUser, "_id" | "createdAt" | "updatedAt">): Promise<void> {
        await this.repository.create(data);
    }

}