import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {

    constructor (
        private CreateUserUseCase: CreateUserUseCase
    ){}

    async handle(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body;

        try {
            await this.CreateUserUseCase.execute({
                name,
                email,
                password,
            });

            return res.status(201).json({ message: "OK" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "error" })
        }
        
    }
}