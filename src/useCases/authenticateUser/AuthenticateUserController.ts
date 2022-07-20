import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AutheticateUserController {
    async handle(req: Request, res: Response) {
        const { userName, password } = req.body;
        const authenticateUserUseCase = new AuthenticateUserUseCase();
        const token = await authenticateUserUseCase.execute({
            userName: userName,
            password: password
        });
        return res.json(token);
    }
}
export { AutheticateUserController }