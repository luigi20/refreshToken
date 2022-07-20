import { compare } from 'bcryptjs';
import { client } from '../../prisma/client';
import { sign } from "jsonwebtoken";
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

interface IRequest {
    userName: string;
    password: string;
}
class AuthenticateUserUseCase {
    async execute({ userName, password }: IRequest) {
        const userAlreadyExists = await client.user.findFirst({
            where: {
                userName
            }
        });
        if (!userAlreadyExists) {
            throw new Error("User or password incorrect");
        }
        const passwordMatch = await compare(password, userAlreadyExists.password);
        if (!passwordMatch) {
            throw new Error("User or password incorrect");
        }
        /*     const token = sign({}, "90a64e35-0488-46ba-88f7-8527237fc414", {
                 subject: userAlreadyExists.id,
                 expiresIn: "20s"
             });*/
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists.id);
        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id
            }
        })
        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);
        return { token, refreshToken };
    }
}
export { AuthenticateUserUseCase }