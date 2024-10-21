'use server';

import prisma from "@/lib/db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function handlePasswordUpdate(formData: FormData) {

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return {
            error: 'Complete todos los campos',
        };
    }

    if (newPassword !== confirmPassword) {
        return {
            error: 'Las contraseñas no coinciden',
        };
    }

    const cookiesStore = cookies();
    const token = cookiesStore.get('pentimiento_app');

    if (!token) {
        return {
            error: 'Usuario no autenticado',
        };
    }

    try {
        const decoded = jwt.verify(token.value, `${process.env.JWT_KEY}`) as jwt.JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return {
                error: 'Usuario no encontrado',
            };
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordCorrect) {
            return {
                error: 'La contraseña actual es incorrecta',
            };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedNewPassword,
            },
        });

        return {
            message: 'Contraseña actualizada exitosamente',
        };

    } catch (error) {
        console.log(error);
        return {
            error: 'Algo salió mal',
        };
    }
}
