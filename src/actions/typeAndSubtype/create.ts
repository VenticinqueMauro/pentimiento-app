'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleCreateTypeAndSubtype(formData: FormData) {

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

    // Procesar la lista de subtipos enviados desde el formulario
    const subtypes = [];
    for (let i = 0; formData.has(`subtypes[${i}][name]`); i++) {
        let subtypeName = (formData.get(`subtypes[${i}][name]`) as string)?.trim().toLowerCase();

        subtypeName = subtypeName.replace(/\s+/g, '-');

        if (subtypeName && validNamePattern.test(subtypeName)) {
            subtypes.push({ name: subtypeName });
        } else if (subtypeName) {
            return {
                error: 'El nombre del subtipo solo puede contener letras minúsculas, números y guiones.'
            };
        }
    }

    try {
        // Verificar si el tipo ya existe
        const existingType = await prisma.type.findUnique({
            where: { name: typeName },
        });

        if (existingType) {
            return {
                error: 'El tipo ya existe.'
            };
        }

        // Crear el tipo
        const newType = await prisma.type.create({
            data: {
                name: typeName,
            },
        });

        // Crear los subtipos asociados si existen
        const createdSubtypes = [];
        for (const subtype of subtypes) {
            // Verificar si el subtipo ya existe
            const existingSubtype = await prisma.subtype.findUnique({
                where: { name: subtype.name },
            });

            if (existingSubtype) {
                return {
                    error: `El subtipo "${subtype.name}" ya existe.`
                };
            }

            const newSubtype = await prisma.subtype.create({
                data: {
                    name: subtype.name,
                    typeId: newType.id,
                },
            });
            createdSubtypes.push(newSubtype);
        }

        // Revalidar la caché de la página de tipos
        revalidatePath('/dashboard/types');

        return {
            data: {
                type: {
                    id: newType.id,
                    name: newType.name,
                },
                subtypes: createdSubtypes,
            },
            message: 'Tipo y subtipos creados exitosamente'
        };
    } catch (error) {
        console.error("Error al crear tipo o subtipos:", error);
        return {
            error: 'Algo salió mal al crear el tipo o subtipos'
        };
    }
}
