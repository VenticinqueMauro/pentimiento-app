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

        // Verifica que el resultado tenga los campos esperados y retorna la URL y el public_id
        if (typeof result === 'object' && result !== null && 'secure_url' in result && 'public_id' in result) {
            // Extraer solo la última parte del public_id
            const publicId = (result as { public_id: string }).public_id as string;
            return {
                data: {
                    url: (result as { secure_url: string }).secure_url as string,
                    publicId,
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

    const uploadResults: { url: string; publicId: string }[] = [];
    const errors: { error: string }[] = [];

    for (const file of files) {
        try {
            const fileBuffer = Buffer.from(await file.arrayBuffer());

            const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: folderPath,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Error en Cloudinary upload:", error);
                            reject(new Error(error.message));
                        } else if (result && 'secure_url' in result && 'public_id' in result) {
                            console.log("Resultado de Cloudinary:", result);  // Añade logs para verificar el resultado
                            resolve(result);
                        } else {
                            reject(new Error('Formato de resultado inesperado de Cloudinary'));
                        }
                    }
                );
                uploadStream.end(fileBuffer);
                    }
                );
            if (result && 'secure_url' in result && 'public_id' in result) {
                const publicId = result.public_id as string;
                uploadResults.push({
                    url: result.secure_url,
                    publicId,
                });
            } else {
                throw new Error('Formato de resultado inesperado');
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






