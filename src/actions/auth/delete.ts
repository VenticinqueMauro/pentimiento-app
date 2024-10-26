'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleDeleteUser(id: number) {

    try {
        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        revalidatePath('/dashboard/admins');

        return {
            message: 'Usuario eliminado exitosamente'
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'Error al eliminar el usuario'
        };
    }
}