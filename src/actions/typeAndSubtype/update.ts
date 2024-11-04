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

    // Definir el tipo de subtipo para TypeScript
    type SubtypeData = {
        id?: number;
        name: string;
    };

    // Procesar la lista de subtipos enviados desde el formulario
    const subtypes: SubtypeData[] = [];
    for (let i = 0; formData.has(`subtypes[${i}][name]`); i++) {
        const subtypeId = formData.get(`subtypes[${i}][id]`);
        const subtypeName = (formData.get(`subtypes[${i}][name]`) as string)?.trim().toLowerCase();
        if (subtypeName) {
            subtypes.push({
                id: subtypeId ? parseInt(subtypeId as string, 10) : undefined,
                name: subtypeName,
            });
        }
    }

    try {
        // Actualizar el Type
        const updatedType = await prisma.type.update({
            where: { id: parseInt(typeId as string, 10) },
            data: { name: typeName },
        });

        // Obtener los subtipos existentes en la base de datos
        const existingSubtypes = await prisma.subtype.findMany({
            where: { typeId: updatedType.id },
        });

        // Identificar subtipos para eliminar
        const subtypesToDelete = existingSubtypes.filter(
            (existingSubtype) => !subtypes.some((subtype) => subtype.id === existingSubtype.id)
        );

        // Eliminar subtipos que ya no están en el formulario
        await prisma.subtype.deleteMany({
            where: {
                id: {
                    in: subtypesToDelete.map((subtype) => subtype.id),
                },
            },
        });

        // Crear o actualizar subtipos
        for (const subtype of subtypes) {
            if (subtype.id) {
                // Actualizar subtipo existente
                await prisma.subtype.update({
                    where: { id: subtype.id },
                    data: { name: subtype.name },
                });
            } else {
                // Crear nuevo subtipo
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
