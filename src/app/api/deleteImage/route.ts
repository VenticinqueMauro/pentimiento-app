import cloudinary from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
    }

    try {
        const body = await req.json();
        const { publicId } = body;

        if (!publicId) {
            return NextResponse.json({ error: 'publicId es requerido' }, { status: 400 });
        }

        await cloudinary.v2.uploader.destroy(publicId);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar imagen de Cloudinary:", error);
        return NextResponse.json({ error: 'Error al eliminar la imagen' }, { status: 500 });
    }
}
