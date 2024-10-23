'use server';

import prisma from "@/lib/db";
import bcrypt from 'bcrypt';

export async function handleResetPassword(formData: FormData) {
    const newPassword = formData.get('newPassword') as string;

    if (!newPassword) {
        return {
            error: 'Ingrese una nueva contraseña',
        };
    }

    try {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                email: "admin@colletiapp.com", 
            },
            data: {
                password: hashedNewPassword,
            },
        });

        return {
            message: 'Contraseña restablecida exitosamente',
        };
    } catch (error) {
        console.log(error);
        return {
            error: 'Algo salió mal al restablecer la contraseña',
        };
    }
}
