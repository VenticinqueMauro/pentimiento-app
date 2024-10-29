'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleUploadImage(portadaFile: Blob | File, type: string, subtype?: string) {
    if (!portadaFile) {
        return { error: 'No se ha proporcionado ningún archivo para cargar.' };
    }

    const typeName = type === 'cine/tv' ? 'cine-tv' : type;
    const folderPath = `/${typeName}${subtype ? `/${subtype}` : ''}`;

    try {
        // Convertir el archivo a Buffer
        const fileBuffer = Buffer.from(await portadaFile.arrayBuffer());

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
            uploadStream.end(fileBuffer);
        });

        if (typeof result === 'object' && result !== null && 'secure_url' in result) {
            return {
                data: {
                    url: result.secure_url as string,
                },
                message: 'Imagen subida exitosamente',
            };
        } else {
            throw new Error('Unexpected result format');
        }
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return { error: 'Error al subir la imagen a Cloudinary' };
    }
}

export async function handleUploadGalleryImages(files: File[], type: string, subtype?: string) {
    if (!files || files.length === 0) {
        return { error: 'No se han proporcionado archivos para cargar.' };
    }

    const typeName = type === 'cine/tv' ? 'cine-tv' : type;
    const folderPath = `/${typeName}${subtype ? `/${subtype}` : ''}`;

    const uploadResults: { url: string }[] = [];
    const errors: { error: string }[] = [];

    for (const file of files) {
        try {
            const fileBuffer = await file.arrayBuffer();
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

            if (typeof result === 'object' && result !== null && 'secure_url' in result) {
                uploadResults.push({ url: result.secure_url as string });
            } else {
                throw new Error('Unexpected result format');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error al subir una imagen de la galería:", error);
                errors.push({ error: error.message });
            }
        }
    }

    return errors.length > 0
        ? { error: 'Error en algunas imágenes de la galería', data: uploadResults, errors }
        : { data: uploadResults };
}


