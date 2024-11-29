/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleCreateProject(formData: FormData) {
    const title = formData.get('title') as string;
    const uniqueCode = formData.get('uniqueCode') as string;
    const thumbnailUrl = formData.get('thumbnailUrl') as string;
    const thumbnailId = formData.get('thumbnailId') as string;
    const mainImageUrl = formData.get('mainImageUrl') as string;
    const mainImageId = formData.get('mainImageId') as string;
    const typeId = formData.get('typeId') as string | null;
    const subtypeIds = formData.get('subtypeIds') as string | null;
    const subtypeIdsArray = subtypeIds ? JSON.parse(subtypeIds) : [];
    const colorists = formData.get('colorists');
    const coloristsArray = colorists ? JSON.parse(colorists as string) : [];
    const director = formData.get('director') as string | null;
    const producer = formData.get('producer') as string | null;
    const cinematographer = formData.get('df') as string | null;
    const agency = formData.get('agency') as string | null;
    const videoLink = formData.get('videoLink') as string | null;
    const imdbLink = formData.get('imdbUrl') as string | null;
    const galleryUrls = formData.get('galleryUrls') as string | null;
    const galleryUrlsArray = galleryUrls ? JSON.parse(galleryUrls) : [];
    const synopsis = formData.get('synopsis') as string | null;
    const description = formData.get('description') as string | null;

    // Validaciones
    if (!title) {
        return { error: 'El campo "título" es obligatorio.' };
    }
    if (!uniqueCode) {
        return { error: 'El campo "código único" es obligatorio.' };
    }
    if (!thumbnailUrl || !thumbnailId) {
        return { error: 'La imagen miniatura es obligatoria.' };
    }
    if (!mainImageUrl || !mainImageId) {
        return { error: 'La imagen de portada es obligatoria.' };
    }
    if (coloristsArray.length === 0) {
        return { error: 'El campo "coloristas" es obligatorio y debe tener al menos un colorista.' };
    }

    try {
        // Procesar las imágenes de la galería
        let galleryData: { url: string; publicId: string }[] = [];
        if (galleryUrlsArray && galleryUrlsArray.length > 0) {
            galleryData = galleryUrlsArray.map((image: { url: string; publicId: string }) => ({
                url: image.url,
                publicId: image.publicId,
            }));
        }

        // Obtener el valor máximo de displayOrder y asignar el siguiente valor
        const maxDisplayOrder = await prisma.project.aggregate({
            _max: { displayOrder: true },
        });
        const displayOrder = (maxDisplayOrder._max.displayOrder || 0) + 1;

        // Preparar los datos para la creación del proyecto
        const projectData: any = {
            title: title,
            uniqueCode: uniqueCode?.toLocaleLowerCase(),
            thumbnailUrl,
            thumbnailId,
            mainImageUrl,
            mainImageId,
            colorists: { connect: coloristsArray.map((coloristId: number) => ({ id: coloristId })) },
            director: director,
            producer: producer,
            df: cinematographer,
            agency: agency,
            videoLink: videoLink,
            imdbUrl: imdbLink,
            gallery: galleryData.length > 0
                ? {
                    create: galleryData,
                }
                : undefined,
            synopsis: synopsis,
            description: description,
            displayOrder,
        };

        // Asociar el tipo si se proporcionó
        if (typeId) {
            const type = await prisma.type.findUnique({ where: { id: parseInt(typeId) } });
            if (!type) {
                return { error: 'Tipo no válido o no encontrado' };
            }
            projectData.type = { connect: { id: type.id } };
        }

        // Asociar los subtipos seleccionados
        if (subtypeIdsArray.length > 0) {
            projectData.subtypes = {
                connect: subtypeIdsArray.map((id: string) => ({ id: parseInt(id) })),
            };
        }

        // Crear el proyecto en la base de datos
        const newProject = await prisma.project.create({
            data: projectData,
        });

        // Revalidar solo si el proyecto se ha creado con éxito
        revalidatePath("/dashboard/projects");

        return {
            data: newProject,
            message: 'Proyecto creado exitosamente',
        };
    } catch (error) {
        console.error("Error al crear proyecto:", error);
        return { error: 'Error al crear el proyecto' };
    }
}
