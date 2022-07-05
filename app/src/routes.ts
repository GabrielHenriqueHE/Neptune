import { Request, Response, Router } from "express";

import { createUserController } from "./useCases/CreateUser/index";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Ok" })
})

router.post("/users", async (req: Request, res: Response) => {
    return await createUserController.handle(req, res);
})

export default router;