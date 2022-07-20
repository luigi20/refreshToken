import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //Validação do Token JWT
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            message: "JWT token is missing"
        });
    }
    const [, token] = authHeader.split(' ');
    try {
        verify(token, "90a64e35-0488-46ba-88f7-8527237fc414");
        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Token invalid"
        });
    }
}