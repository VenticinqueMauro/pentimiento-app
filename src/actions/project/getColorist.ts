'use server';

import prisma from "@/lib/db";

export async function handleGetColorists() {
    try {
        const colorists = await prisma.colorist.findMany();
        return { data: colorists };
    } catch (error) {
        console.error("Error al obtener coloristas:", error);
        return { error: 'Error al obtener coloristas', data: [] };
    }
}
