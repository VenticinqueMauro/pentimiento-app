'use server';

import prisma from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
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


export async function handleUploadGalleryImages(files: File[], typeName: string, subtypeName?: string) {
    if (!files || files.length === 0) {
        return { error: 'No se han proporcionado archivos para cargar.' };
    }

    // Normalizar los nombres de tipo para el folderPath
    const normalizeName = (name: string) => name.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase();
    const normalizeTypeName = normalizeName(typeName);

    const folderPath = `/${normalizeTypeName}${subtypeName ? `/${normalizeName(subtypeName)}` : ''}`;

    const MAX_FILE_SIZE_MB = 10; // Límite por archivo en MB
    const MAX_FILES_PER_BATCH = 5; // Máximo de archivos por batch para evitar sobrecarga
    const uploadResults: { url: string; publicId: string }[] = [];
    const errors: { error: string }[] = [];

    // Filtrar archivos que excedan el tamaño máximo permitido
    const validFiles = files.filter((file) => {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            errors.push({ error: `El archivo ${file.name} excede el tamaño máximo permitido de ${MAX_FILE_SIZE_MB} MB.` });
            return false;
        }
        return true;
    });

    // Procesar las subidas en lotes
    for (let i = 0; i < validFiles.length; i += MAX_FILES_PER_BATCH) {
        const batch = validFiles.slice(i, i + MAX_FILES_PER_BATCH);

        console.log(`Procesando batch ${Math.floor(i / MAX_FILES_PER_BATCH) + 1} con ${batch.length} archivos`);

        // Subir cada lote en paralelo
        const uploadPromises = batch.map(async (file) => {
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
                                console.log("Resultado de Cloudinary:", result);
                                resolve(result);
                            } else {
                                reject(new Error('Formato de resultado inesperado de Cloudinary'));
                            }
                        }
                    );
                    uploadStream.end(fileBuffer);
                });

                uploadResults.push({ url: result.secure_url, publicId: result.public_id });
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Error al subir el archivo ${file.name}:`, error.message);
                    errors.push({ error: `Error al subir el archivo ${file.name}: ${error.message}` });
                }
            }
        });

        // Esperar a que todas las subidas del lote terminen
        await Promise.all(uploadPromises);
    }

    return errors.length > 0
        ? { error: 'Error en algunas imágenes de la galería', data: uploadResults, errors }
        : { data: uploadResults };
}


export async function handleDeleteImageFromCloudinaryAndDB(publicId: string) {
    try {
        // Primero, elimina la imagen de Cloudinary
        const cloudinaryResult = await cloudinary.api.delete_resources([publicId], {
            resource_type: 'image',
        });

        // Si la eliminación en Cloudinary es exitosa, elimina también de la base de datos
        if (cloudinaryResult.deleted && cloudinaryResult.deleted[publicId] === 'deleted') {
            const dbResult = await prisma.gallery.deleteMany({
                where: {
                    publicId: publicId,
                },
            });

            // Verificamos si se eliminó la entrada en la base de datos
            if (dbResult.count > 0) {
                return { message: 'Imagen eliminada correctamente de Cloudinary y la base de datos' };
            } else {
                console.warn("La imagen se eliminó de Cloudinary, pero no se encontró en la base de datos.");
                return { warning: 'Imagen eliminada de Cloudinary, pero no encontrada en la base de datos' };
            }
        } else {
            throw new Error('Error al eliminar la imagen en Cloudinary');
        }
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return { error: 'Error al eliminar la imagen de Cloudinary o de la base de datos' };
    }
}

export async function handleDeleteImage(publicId: string) {
    try {
        const result = await cloudinary.api.delete_resources([publicId], {
            resource_type: 'image',
        });
        return { message: 'Imagen eliminada correctamente', result };
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return { error: 'Error al eliminar la imagen de Cloudinary' };
    }
}

export async function handleUpdateImage(newFile: File, publicId: string, type: string, subtype?: string) {
    // Primero, elimina la imagen existente en Cloudinary
    const deleteResult = await handleDeleteImage(publicId);
    if (deleteResult.error) {
        return { error: deleteResult.error };
    }

    // Sube la nueva imagen en la misma carpeta proporcionando `type` y `subtype`
    const uploadResult = await handleUploadImage(newFile, type, subtype);
    if (uploadResult.error) {
        return { error: 'Error al subir la nueva imagen a Cloudinary' };
    }

    return {
        data: uploadResult.data,
        message: 'Imagen actualizada correctamente',
    };
}






