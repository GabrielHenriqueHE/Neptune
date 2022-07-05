import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {

    constructor (
        private CreateUserUseCase: CreateUserUseCase
    ){}

    /*
    * Receive a Request and Response interface
    * It tries to execute the CreateUserUseCase and if is alright returns an "ok" message
    * If it goes wrong, returns an "error" message
    * 
    * Returns: Response
    */

    async handle(req: Request, res: Response): Promise<Response> {
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