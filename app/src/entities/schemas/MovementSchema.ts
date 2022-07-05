import mongoose from "../../../bin/configs/database";
import { IMovement } from "../interfaces/IMovement";

const MovementSchema = new mongoose.Schema<Omit<IMovement, "_id" | "createdAt" | "updatedAt">>({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: [{
        type: String,
        required: true,
    }],
    status: {
        type: String,
        required: true,
        enum: ["concluded", "pending", "canceled"],
        default: "pending"
    },
    value: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export default MovementSchema;