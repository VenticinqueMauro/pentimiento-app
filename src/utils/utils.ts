import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id: number;
    email: string;
    fullname: string;
}

export function decodeToken(): DecodedToken | { error: string } {
    const token = cookies().get("colleti_app")?.value;
    if (!token) {
        return { error: 'No autorizado' };
    }

    try {
        const decodedToken = verify(token, `${process.env.JWT_KEY}`);

        if (typeof decodedToken === "object" && "email" in decodedToken) {
            return decodedToken as DecodedToken;
        } else {
            return { error: 'Token inválido' };
        }
    } catch (error) {
        return { error: `Token inválido, ${error}` };
    }
}