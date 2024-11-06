'use server';

import prisma from "@/lib/db";
import { handleDeleteImage, handleUploadGalleryImages, handleUploadImage } from "./uploadImgs";

export async function handleUpdateProject(projectId: number, formData: FormData) {
    const title = formData.get('title') as string;
    const typeId = formData.get('typeId') as string | null;
    const subtypeId = formData.get('subtypeId') as string | null;
    const file = formData.get('mainImageUrl') as File | null;
    const thumbnailFile = formData.get('thumbnailUrl') as File | null;
    const colorists = formData.get('colorists');
    const coloristsArray = colorists ? JSON.parse(colorists as string) : [];
    const director = formData.get('director') as string | null;
    const producer = formData.get('producer') as string | null;
    const cinematographer = formData.get('df') as string | null;
    const agency = formData.get('agency') as string | null;
    const videoLink = formData.get('videoLink') as string | null;
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const synopsis = formData.get('synopsis') as string | null;
    const description = formData.get('description') as string | null;

    // Fetch the existing project
    const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
        include: { gallery: true }
    });
    if (!existingProject) {
        return { error: 'Proyecto no encontrado' };
    }

    let thumbnailUrl = existingProject.mainImageUrl;
    let thumbnailId = existingProject.mainImageId;
    let mainImageUrl = existingProject.mainImageUrl;
    let mainImageId = existingProject.mainImageId;

    try {
        // Buscar el tipo
        const type = typeId ? await prisma.type.findUnique({ where: { id: parseInt(typeId) } }) : null;
        console.log(type)
        if (!type) {
            return { error: 'Tipo no válido o no encontrado' };
        }

        // Buscar el subtipo
        const subtype = subtypeId ? await prisma.subtype.findUnique({ where: { id: parseInt(subtypeId) } }) : null;

        // Update thumbnail image if a new one is provided
        if (thumbnailFile) {
            if (thumbnailId) {
                await handleDeleteImage(thumbnailId); // Delete old image if exists
            }
            const uploadResult = await handleUploadImage(thumbnailFile, type.name || '', subtype?.name || '');
            if (uploadResult.error || !uploadResult.data) {
                throw new Error('Error al subir la nueva imagen de portada');
            }
            thumbnailUrl = uploadResult.data.url;
            thumbnailId = uploadResult.data.publicId;
        }

        // Update main image if a new one is provided
        if (file) {
            if (mainImageId) {
                await handleDeleteImage(mainImageId); // Delete old image if exists
            }
            const uploadResult = await handleUploadImage(file, type.name || '', subtype?.name || '');
            if (uploadResult.error || !uploadResult.data) {
                throw new Error('Error al subir la nueva imagen de portada');
            }
            mainImageUrl = uploadResult.data.url;
            mainImageId = uploadResult.data.publicId;
        }



        // Update gallery images if new files are provided
        let galleryData = existingProject.gallery.map((image) => ({
            url: image.url,
            publicId: image.publicId
        }));

        if (galleryFiles.length > 0) {
            // Delete old gallery images
            for (const image of galleryData) {
                if (image.publicId) await handleDeleteImage(image.publicId);
            }
            // Upload new gallery images
            const galleryUploadResult = await handleUploadGalleryImages(galleryFiles, type.name || '', subtype?.name || '');
            if ('error' in galleryUploadResult) {
                throw new Error(galleryUploadResult.error);
            }

            galleryData = galleryUploadResult.data.map(({ url, publicId }) => ({
                url,
                publicId,
            }));
        }

        // Update project in the database
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                title: title?.toLowerCase(),
                thumbnailUrl,
                thumbnailId,
                mainImageUrl,
                mainImageId,
                type: typeId ? { connect: { id: parseInt(typeId) } } : undefined,
                subtype: subtypeId ? { connect: { id: parseInt(subtypeId) } } : undefined,
                colorists: {
                    set: coloristsArray.map((coloristId: number) => ({ id: coloristId })),
                },
                director: director?.toLowerCase(),
                producer: producer?.toLowerCase(),
                df: cinematographer?.toLowerCase(),
                agency: agency?.toLowerCase(),
                videoLink: videoLink?.toLowerCase(),
                gallery: {
                    deleteMany: {}, // Clear existing gallery
                    create: galleryData.map(({ url, publicId }) => ({ url, publicId }))
                },
                synopsis: synopsis?.toLowerCase(),
                description: description?.toLowerCase()
            },
        });

        console.log(updatedProject)

        return {
            data: updatedProject,
            message: "Proyecto actualizado exitosamente",
        };
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        return { error: 'Error al actualizar el proyecto' };
    }
}
