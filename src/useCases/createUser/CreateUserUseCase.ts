import { client } from '../../prisma/client';
import { hash } from 'bcryptjs';
interface IUserRequest {
    name: string;
    password: string;
    userName: string;
}
class CreateUserUseCase {
    async execute({ name, password, userName }: IUserRequest) {
        // Verificar se usuario existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                "userName": userName
            }
        });
        if (userAlreadyExists) {
            throw new Error("User Already Exists");
        }
        // Cadastra o usuario
        const passwordHash = await hash(password, 8);
        const user = await client.user.create({
            data: {
                name,
                userName,
                password: passwordHash
            }
        });
        return user;
    }
}

export { CreateUserUseCase }