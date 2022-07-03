export interface IWallet {
    _id: string;
    balance: Number;
    movements: any[];
    createdAt: Date;
    updatedAt: Date;
}