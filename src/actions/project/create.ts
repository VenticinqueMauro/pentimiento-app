'use server';

import prisma from "@/lib/db"; // Si necesitas Prisma para guardar datos adicionales
import { handleUploadImage } from "./uploadImgs";

export async function handleCreateProject(formData: FormData) {

    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const subtype = formData.get('subtype') as string;
    const file = formData.get('mainImageUrl') as File | null;

    if (!title || !file) {
        return { error: 'El título y la imagen son obligatorios.' };
    }

    try {
        const uploadResult = await handleUploadImage(file, type, subtype);

        if (uploadResult.error || !uploadResult.data?.url) {
            return { error: 'Error al subir la imagen a Cloudinary' };
        }

        const mainImageUrl = String(uploadResult.data.url);
        const newProject = await prisma.project.create({
            data: {
                title,
                mainImageUrl,
                type: 'publicidad',
            },
        });

        return {
            data: newProject,
            message: 'Proyecto creado exitosamente',
        };
    } catch (error) {
        console.error("Error al crear proyecto:", error);
        return { error: 'Error al crear el proyecto' };
    }

}
