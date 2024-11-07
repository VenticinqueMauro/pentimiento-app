'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleEditTypeOrSubtype(formData: FormData) {
    const typeId = formData.get('typeId');
    const typeName = (formData.get('typeName') as string)?.trim().toLowerCase();

    if (!typeName) {
        return {
            error: 'El campo nombre del tipo es obligatorio'
        };
    }

    const validNamePattern = /^[a-z0-9-]+$/;
    if (!validNamePattern.test(typeName)) {
        return {
            error: 'El nombre del tipo solo puede contener letras minúsculas, números y guiones.'
        };
    }

    type SubtypeData = {
        id?: number;
        name: string;
    };

    const subtypes: SubtypeData[] = [];
    for (let i = 0; formData.has(`subtypes[${i}][name]`); i++) {
        const subtypeId = formData.get(`subtypes[${i}][id]`);
        let subtypeName = (formData.get(`subtypes[${i}][name]`) as string)?.trim().toLowerCase();

        // Reemplazar espacios por guiones en el nombre del subtipo
        subtypeName = subtypeName.replace(/\s+/g, '-');

        if (subtypeName && validNamePattern.test(subtypeName)) {
            subtypes.push({
                id: subtypeId ? parseInt(subtypeId as string, 10) : undefined,
                name: subtypeName,
            });
        } else if (subtypeName) {
            return {
                error: 'El nombre del subtipo solo puede contener letras minúsculas, números y guiones.'
            };
        }
    }

    try {
        const updatedType = await prisma.type.update({
            where: { id: parseInt(typeId as string, 10) },
            data: { name: typeName },
        });

        const existingSubtypes = await prisma.subtype.findMany({
            where: { typeId: updatedType.id },
        });

        const subtypesToDelete = existingSubtypes.filter(
            (existingSubtype) => !subtypes.some((subtype) => subtype.id === existingSubtype.id)
        );

        await prisma.subtype.deleteMany({
            where: {
                id: {
                    in: subtypesToDelete.map((subtype) => subtype.id),
                },
            },
        });

        for (const subtype of subtypes) {
            if (subtype.id) {
                await prisma.subtype.update({
                    where: { id: subtype.id },
                    data: { name: subtype.name },
                });
            } else {
                await prisma.subtype.create({
                    data: {
                        name: subtype.name,
                        typeId: updatedType.id,
                    },
                });
            }
        }

        revalidatePath('/dashboard/types');

        return {
            data: {
                id: updatedType.id,
                name: updatedType.name,
            },
            message: 'Tipo y subtipos actualizados exitosamente'
        };
    } catch (error) {
        console.error("Error al actualizar el tipo o subtipos:", error);
        return {
            error: 'Algo salió mal al actualizar el tipo o subtipos'
        };
    }
}
