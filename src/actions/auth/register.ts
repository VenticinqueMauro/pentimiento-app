'use server';

import prisma from "@/lib/db";
import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache";

export async function handleRegister(formData: FormData) {

    const username = (formData.get('email') as string).trim().toLowerCase();
    const email = `${username}@pentimento.app`;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const fullname = (formData.get('fullname') as string).trim();

    if (!username || !password || !fullname || !confirmPassword) {
        return {
            error: 'Complete todos los campos'
        };
    }

    if (password !== confirmPassword) {
        return {
            error: 'Las contraseñas no coinciden'
        };
    }

    // Validación de solo el nombre de usuario (sin el dominio)
    const usernameRegex = /^[^\s@]+$/;
    if (!usernameRegex.test(username)) {
        return {
            error: 'Nombre de usuario no válido'
        };
    }

    if (password.length < 4) {
        return {
            error: 'La contraseña debe tener al menos 4 caracteres'
        };
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullname,
            },
        });

        revalidatePath('/dashboard/admins');

        return {
            data: {
                email: newUser.email,
                id: newUser.id
            },
            message: 'Usuario creado exitosamente'
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'Error al crear el usuario'
        };
    }
};
