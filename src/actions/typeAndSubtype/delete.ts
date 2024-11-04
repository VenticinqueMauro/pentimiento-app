'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleDeleteTypeAndSubtypes(typeId: number) {
    try {
        // Eliminar todos los subtipos asociados al tipo
        await prisma.subtype.deleteMany({
            where: { typeId },
        });

        // Eliminar el tipo
        await prisma.type.delete({
            where: { id: typeId },
        });

        // Revalidar la caché de la página de tipos para reflejar los cambios
        revalidatePath('/dashboard/types');

        return {
            message: 'Tipo y subtipos eliminados exitosamente'
        };
    } catch (error) {
        console.error("Error al eliminar tipo y subtipos:", error);
        return {
            error: 'Algo salió mal al eliminar el tipo y subtipos'
        };
    }
}
