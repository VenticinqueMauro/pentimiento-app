'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleCreateTypeAndSubtype(formData: FormData) {
    // Convertir los nombres a minúsculas y eliminar espacios al inicio y al final
    const typeName = (formData.get('typeName') as string)?.trim().toLowerCase();
    const subtypeName = (formData.get('subtypeName') as string)?.trim().toLowerCase();

    // Expresión regular para permitir solo letras, números y guiones
    const validNamePattern = /^[a-z0-9-]+$/;

    // Validar typeName
    if (!typeName) {
        return {
            error: 'El campo nombre del tipo es obligatorio'
        };
    }
    if (!validNamePattern.test(typeName)) {
        return {
            error: 'El nombre del tipo solo puede contener letras minúsculas, números y guiones.'
        };
    }

    // Validar subtypeName si existe
    if (subtypeName && !validNamePattern.test(subtypeName)) {
        return {
            error: 'El nombre del subtipo solo puede contener letras minúsculas, números y guiones.'
        };
    }

    try {
        // Crear el tipo
        const newType = await prisma.type.create({
            data: {
                name: typeName,
            },
        });

        let newSubtype;
        if (subtypeName) {
            // Crear el subtipo si se ha especificado un nombre de subtipo
            newSubtype = await prisma.subtype.create({
                data: {
                    name: subtypeName,
                    typeId: newType.id, // Relaciona el subtipo con el tipo recién creado
                },
            });
        }

        // Revalidar la caché de la página de tipos para reflejar los cambios
        revalidatePath('/dashboard/types');

        return {
            data: {
                type: {
                    id: newType.id,
                    name: newType.name,
                },
                subtype: newSubtype
                    ? {
                        id: newSubtype.id,
                        name: newSubtype.name,
                        typeId: newSubtype.typeId,
                    }
                    : null,
            },
            message: 'Tipo y subtipo creados exitosamente'
        };
    } catch (error) {
        console.error("Error al crear tipo o subtipo:", error);
        return {
            error: 'Algo salió mal al crear el tipo o subtipo'
        };
    }
}
