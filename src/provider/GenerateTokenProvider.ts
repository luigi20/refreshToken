import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId: string) {
        const token = sign({}, "90a64e35-0488-46ba-88f7-8527237fc414", {
            subject: userId,
            expiresIn: "20s"
        });
        return token;
    }
}

export { GenerateTokenProvider }