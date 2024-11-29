'use server';

import prisma from "@/lib/db";
import { handleDeleteImageFromCloudinary } from "@/utils/utils";

export async function handleUpdateProject(projectId: number, formData: FormData) {
    const title = formData.get('title') as string;
    const uniqueCode = formData.get('uniqueCode') as string;
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

    const thumbnailUrl = formData.get('thumbnailUrl') as string;
    const thumbnailId = formData.get('thumbnailId') as string;
    const mainImageUrl = formData.get('mainImageUrl') as string;
    const mainImageId = formData.get('mainImageId') as string;

    // Fetch the existing project
    const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
        include: { gallery: true }
    });
    if (!existingProject) {
        return { error: 'Proyecto no encontrado' };
    }

    try {
        // Buscar el tipo
        const type = typeId ? await prisma.type.findUnique({ where: { id: parseInt(typeId) } }) : null;
        if (typeId && !type) {
            return { error: 'Tipo no válido o no encontrado' };
        }

        // Procesar la galería
        let galleryData: { url: string; publicId: string }[] = existingProject.gallery.map((image) => ({
            url: image.url,
            publicId: image.publicId || '',
        }));

        if (galleryUrlsArray.length > 0) {
            galleryData = galleryUrlsArray;
        }

        // Eliminar imágenes que ya no están en la galería
        const existingPublicIds = existingProject.gallery.map((image) => image.publicId);
        const newPublicIds = galleryUrlsArray.map((image: { url: string; publicId: string }) => image.publicId);

        const publicIdsToDelete = existingPublicIds.filter((id) => id !== null && !newPublicIds.includes(id));

        // Eliminar imágenes de Cloudinary que ya no están en la galería
        for (const publicId of publicIdsToDelete) {
            if (publicId !== null) {
                await handleDeleteImageFromCloudinary(publicId);
            }
        }

        // Update project in the database
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                title: title,
                uniqueCode: uniqueCode?.toLowerCase(),
                thumbnailUrl,
                thumbnailId,
                mainImageUrl,
                mainImageId,
                type: typeId ? { connect: { id: parseInt(typeId) } } : undefined,
                subtypes: subtypeIdsArray.length > 0
                    ? { set: subtypeIdsArray.map((id: string) => ({ id: parseInt(id) })) }
                    : undefined,
                colorists: {
                    set: coloristsArray.map((coloristId: number) => ({ id: coloristId })),
                },
                director: director,
                producer: producer,
                df: cinematographer,
                agency: agency,
                videoLink: videoLink,
                imdbUrl: imdbLink,
                gallery: {
                    deleteMany: {}, // Eliminar todas las relaciones actuales
                    create: galleryData, // Crear nuevas relaciones
                },
                synopsis: synopsis,
                description: description,
            },
        });

        return {
            data: updatedProject,
            message: "Proyecto actualizado exitosamente",
        };
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        return { error: 'Error al actualizar el proyecto' };
    }
}
