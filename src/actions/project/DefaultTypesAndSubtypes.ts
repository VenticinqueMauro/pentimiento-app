'use server';

import prisma from "@/lib/db";

export async function generateDefaultTypesAndSubtypes() {
    // Define los tipos y subtipos predeterminados
    const typesAndSubtypes = [
        {
            name: 'publicidad',
            subtypes: ['pelo', 'autos', 'producto', 'beauty', 'fashion film']
        },
        {
            name: 'videoclip',
            subtypes: []
        },
        {
            name: 'cine/tv',
            subtypes: ['largometraje', 'cortometraje', 'serie', 'documental']
        }
    ];

    try {
        for (const typeData of typesAndSubtypes) {
            // Verifica si el tipo ya existe
            let type = await prisma.type.findUnique({
                where: { name: typeData.name }
            });

            // Si el tipo no existe, créalo
            if (!type) {
                type = await prisma.type.create({
                    data: { name: typeData.name }
                });
            }

            // Para cada subtipo, verifica si existe y créalo si es necesario
            for (const subtypeName of typeData.subtypes) {
                const existingSubtype = await prisma.subtype.findFirst({
                    where: { name: subtypeName, typeId: type.id }
                });

                if (!existingSubtype) {
                    await prisma.subtype.create({
                        data: {
                            name: subtypeName,
                            type: { connect: { id: type.id } }
                        }
                    });
                }
            }
        }

        console.log("Tipos y subtipos predeterminados generados exitosamente.");
        return { message: "Tipos y subtipos predeterminados generados exitosamente." };

    } catch (error) {
        console.error("Error al generar tipos y subtipos predeterminados:", error);
        return { error: "Error al generar tipos y subtipos predeterminados." };
    }
}


export async function getTypesAndSubtypes() {
    try {
        const typesWithSubtypes = await prisma.type.findMany({
            include: {
                subtypes: true,
            },
        });

        return {
            data: typesWithSubtypes,
            message: 'Tipos y subtipos obtenidos exitosamente',
        };
    } catch (error) {
        console.error("Error al obtener tipos y subtipos:", error);
        return { error: 'Error al obtener tipos y subtipos' };
    }
}