'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleDeleteColorist(id: number) {
    'use server';
    try {
        await prisma.colorist.delete({
            where: {
                id: Number(id),
            },
        });

        revalidatePath('/dashboard/colorist');

        return {
            message: 'Colorista eliminado exitosamente'
        };
    } catch (error) {
        console.error("Error al eliminar colorista:", error);
        return {
            error: 'Algo salió mal al eliminar el colorista'
        };
    }
}