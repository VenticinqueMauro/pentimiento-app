'use server';

import prisma from "@/lib/db";

export async function handleGetAllSubtypes() {
    try {
        const subtypes = await prisma.subtype.findMany({
            select: { name: true },
        });

        return subtypes;
    } catch (error) {
        console.error("Error al obtener todos los subtipos:", error);
        return [];
    }
}