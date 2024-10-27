'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleUploadImage(portadaFile: File, type: string, subtype?: string) {
    if (!portadaFile) {
        return { error: 'No se ha proporcionado ningún archivo para cargar.' };
    }

    // Construir la ruta de la carpeta
    const folderPath = `/${type}${subtype ? `/${subtype}` : ''}`;

    try {
        const fileBuffer = await portadaFile.arrayBuffer();
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: folderPath,
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) reject(new Error(error.message));
                    else resolve(result);
                }
            );
            uploadStream.end(Buffer.from(fileBuffer));
        });

        if (typeof result !== 'object' || result === null || !('secure_url' in result)) {
            throw new Error('Unexpected result format');
        }

        return {
            data: {
                url: result.secure_url,
            },
            message: 'Imagen subida exitosamente',
        };
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return { error: 'Error al subir la imagen a Cloudinary' };
    }
}
