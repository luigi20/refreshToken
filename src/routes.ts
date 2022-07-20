import { Router } from 'express';
import { AutheticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { ensureAuthenticated } from '../src/middleware/ensureAuthenticated';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';

const routes = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AutheticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

routes.post('/users', createUserController.handle);
routes.post('/login', authenticateUserController.handle);
routes.post('/refresh_token', refreshTokenUserController.handle);
routes.get('/courses', ensureAuthenticated, (req, res) => {
    return res.json([
        { id: 1, name: "NodeJs" },
        { id: 2, name: "JavaScript" }
    ])
})
export { routes };
