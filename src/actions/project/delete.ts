'use server';

import prisma from "@/lib/db";
import { handleDeleteImage, handleDeleteImageFromCloudinaryAndDB } from "./uploadImgs";

export async function handleDeleteProject(projectId: number) {
    try {
        // Obtener el proyecto con sus subtipos y galería
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { gallery: true, subtypes: true },
        });

        if (!project) {
            return { error: 'Proyecto no encontrado' };
        }

        // Eliminar la imagen de thumbnail de Cloudinary
        if (project.thumbnailId) {
            const deleteThumbnailResult = await handleDeleteImage(project.thumbnailId);
            if (deleteThumbnailResult.error) {
                return { error: deleteThumbnailResult.error };
            }
        }

        // Eliminar la imagen de portada de Cloudinary
        if (project.mainImageId) {
            const deleteMainImageResult = await handleDeleteImage(project.mainImageId);
            if (deleteMainImageResult.error) {
                return { error: deleteMainImageResult.error };
            }
        }

        // Eliminar cada imagen de la galería de Cloudinary y la base de datos
        for (const galleryImage of project.gallery) {
            if (galleryImage.publicId) {
                const deleteGalleryImageResult = await handleDeleteImageFromCloudinaryAndDB(galleryImage.publicId);
                if (deleteGalleryImageResult.error) {
                    return { error: deleteGalleryImageResult.error };
                }
            }
        }

        // Desconectar subtipos relacionados
        await prisma.project.update({
            where: { id: projectId },
            data: {
                subtypes: {
                    set: [], // Desconectar todos los subtipos
                },
            },
        });

        // Eliminar el proyecto en la base de datos
        await prisma.project.delete({
            where: { id: projectId },
        });

        return { message: 'Proyecto eliminado correctamente' };
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        return { error: 'Error al eliminar el proyecto' };
    }
}
