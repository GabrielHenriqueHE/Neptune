export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    wallet: any;
    createdAt: Date;
    updatedAt: Date;
}