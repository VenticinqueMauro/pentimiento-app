'use server';

import prisma from "@/lib/db";

export async function handleCreateColorist(formData: FormData) {
    
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
        const newColorist = await prisma.colorist.create({
            data: {
                fullname,
                description: description || null,
                profileImg: profileImg || null,
                portfolioImg: portfolioImg || null,
            },
        });

        console.log(newColorist);

        return {
            data: {
                id: newColorist.id,
                fullname: newColorist.fullname,
                description: newColorist.description,
                profileImg: newColorist.profileImg,
                portfolioImg: newColorist.portfolioImg,
            },
            message: 'Colorista creado exitosamente'
        };
    } catch (error) {
        console.error("Error al crear colorista:", error);
        return {
            error: 'Algo salió mal al crear el colorista'
        };
    }
}