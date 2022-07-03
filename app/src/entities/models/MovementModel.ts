import mongoose from "../../../bin/configs/database";

import MovementSchema from "../schemas/MovementSchema";
import { IMovement } from "../interfaces/IMovement";

const MovementModel = mongoose.model<Omit<IMovement, "_id" | "createdAt" | "updatedAt">>("movements", MovementSchema);

export default MovementModel;