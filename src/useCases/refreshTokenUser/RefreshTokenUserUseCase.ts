import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import dayjs from 'dayjs';
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

class RefreshTokenUserUseCase {
    async execute(refresh_Token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_Token
            }
        });
        if (!refreshToken) {
            throw new Error('Refresh Token invalid!');
        }
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
        if (refreshTokenExpired) {
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            });
            const generateRefreshTokenProvider = new GenerateRefreshToken();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);
            return { token, newRefreshToken };
        }
        return token;
    }
}
export { RefreshTokenUserUseCase } 