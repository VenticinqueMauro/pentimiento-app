import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";
// En tu archivo de utilidades o donde manejes las interacciones con Cloudinary
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleDeleteImageFromCloudinary(publicId: string) {
    try {
        await cloudinary.v2.uploader.destroy(publicId);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar la imagen de Cloudinary:", error);
        return { error: 'Error al eliminar la imagen de Cloudinary' };
    }
}


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