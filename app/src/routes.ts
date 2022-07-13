import { Request, Response, Router } from "express";

import { createUserController } from "./useCases/CreateUser/index";

import { authenticateUserController } from "./useCases/AuthenticateUser";
import { ensureAuthenticatedUseCase } from "./useCases/EnsureAuthenticated";
import { refreshTokenController } from "./useCases/RefreshToken";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Ok" })
})

router.get("/courses", ensureAuthenticatedUseCase.execute, (req, res) => {
    return res.status(200).json([
        {
            id: 1,
            course: "Web Development"
        },
        {
            id: 2,
            course: "Data Science"
        }
    ])
})

router.post("/users", async (req: Request, res: Response) => {
    return await createUserController.handle(req, res);
})

router.post("/authenticate", async (req, res) => {
    return await authenticateUserController.handle(req, res);
})

router.post("/authenticate/refresh", async (req, res) => {
    return await refreshTokenController.handle(req, res);
})

export default router;