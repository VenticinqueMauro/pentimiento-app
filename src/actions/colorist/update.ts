'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleEditColorist(formData: FormData) {

    const coloristId = (formData.get('id') as string);
    const fullname = (formData.get('fullname') as string)?.trim().toLowerCase();
    const description = (formData.get('description') as string)?.trim().toLowerCase();
    const profileImg = (formData.get('profileImg') as string)?.trim().toLowerCase();
    const portfolioImg = (formData.get('portfolioImg') as string)?.trim().toLowerCase();

    if (!fullname) {
        return {
            error: 'El campo fullname es obligatorio'
        };
    }

    try {
        const updatedColorist = await prisma.colorist.update({
            where: {
                id: Number(coloristId),
            },
            data: {
                fullname,
                description: description || '',
                profileImg: profileImg || '',
                portfolioImg: portfolioImg || '',
            },
        });

        revalidatePath('/dashboard/colorist');

        return {
            data: {
                id: updatedColorist.id,
                fullname: updatedColorist.fullname,
                description: updatedColorist.description,
                profileImg: updatedColorist.profileImg,
                portfolioImg: updatedColorist.portfolioImg,
            },
            message: 'Colorista actualizado exitosamente'
        };
    } catch (error) {
        console.error("Error al actualizar colorista:", error);
        return {
            error: 'Algo salió mal al actualizar el colorista'
        };
    }
}
