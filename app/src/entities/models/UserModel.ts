import mongoose from "../../../bin/configs/database";

import { IUser } from "../interfaces/IUser";
import UserSchema from "../schemas/UserSchema";

const UserModel = mongoose.model<Omit<IUser, "_id" | "createdAt" | "updatedAt">>("users", UserSchema);

export default UserModel;