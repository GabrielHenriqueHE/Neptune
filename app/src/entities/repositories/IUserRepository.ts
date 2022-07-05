import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

export interface IUserRepository {
    findByEmail(email: string): Promise<any>;
    save(data: Omit<IUser, "_id" | "createdAt" | "updatedAt">): Promise<void>;
}