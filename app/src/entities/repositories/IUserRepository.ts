import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

export interface IUserRepository {
    findByEmail(email: string): Promise<mongoose.HydratedDocument<IUser> | null>;
    authenticate(email: string): Promise<mongoose.HydratedDocument<IUser> | null>;
    save(data: Omit<IUser, "_id" | "createdAt" | "updatedAt">): Promise<void>;
}