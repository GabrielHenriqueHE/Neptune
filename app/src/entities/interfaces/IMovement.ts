export interface IMovement {
    _id: string;
    description: string;
    date: Date;
    type: string;
    category: string[];
    value: Number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}