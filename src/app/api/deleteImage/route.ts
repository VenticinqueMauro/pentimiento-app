import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { publicId } = req.body;

    if (!publicId) {
        return res.status(400).json({ error: 'publicId es requerido' });
    }

    try {
        await cloudinary.v2.uploader.destroy(publicId);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error al eliminar imagen de Cloudinary:", error);
        res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
}
