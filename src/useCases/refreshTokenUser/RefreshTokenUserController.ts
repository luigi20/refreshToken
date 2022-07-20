import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";
import { Request, Response } from 'express';

class RefreshTokenUserController {
    async handle(req: Request, res: Response) {
        const { refresh_token } = req.body;
        const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
        const token = await refreshTokenUserUseCase.execute(refresh_token);
        return token;
    }
}
export { RefreshTokenUserController } 