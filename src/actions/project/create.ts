'use server';

import prisma from "@/lib/db";
import { handleUploadImage } from "./uploadImgs";

export async function handleCreateProject(formData: FormData) {
    const title = formData.get('title') as string;
    const typeId = formData.get('typeId') as string | null;
    const subtypeId = formData.get('subtypeId') as string | null;
    const file = formData.get('mainImageUrl') as File | null;
    const colorists = formData.get('colorists');
    const coloristsArray = colorists ? JSON.parse(colorists as string) : [];
    const director = formData.get('director') as string | null;
    const producer = formData.get('producer') as string | null;
    const cinematographer = formData.get('cinematographer') as string | null;
    const agency = formData.get('agency') as string | null;
    const videoLink = formData.get('videoLink') as string | null;
    const synopsis = formData.get('synopsis') as string | null;
    const description = formData.get('description') as string | null;

    if (!title || !file) {
        return { error: 'El título y la imagen son obligatorios.' };
    }

    try {
        // Encuentra el tipo según el ID proporcionado en el formulario
        const type = typeId ? await prisma.type.findUnique({ where: { id: parseInt(typeId) } }) : null;
        if (!type) {
            return { error: 'Tipo no válido o no encontrado' };
        }

        // Encuentra el subtipo si se proporcionó un ID válido en el formulario
        const subtype = subtypeId ? await prisma.subtype.findUnique({ where: { id: parseInt(subtypeId) } }) : null;

        // Subir la imagen
        const uploadResult = await handleUploadImage(file, type.name, subtype?.name || '');
        if (uploadResult.error || !uploadResult.data?.url) {
            return { error: 'Error al subir la imagen a Cloudinary' };
        }

        const mainImageUrl = String(uploadResult.data.url);

        // Crear el proyecto en la base de datos
        const newProject = await prisma.project.create({
            data: {
                title,
                mainImageUrl,
                type: { connect: { id: type.id } },
                subtype: subtype ? { connect: { id: subtype.id } } : undefined,
                colorists: { connect: coloristsArray.map((coloristId: number) => ({ id: coloristId })) },
                director,
                producer,
                cinematographer,
                agency,
                videoLink,
                synopsis,
                description
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
