'use server';

import prisma from "@/lib/db";
import bcrypt from 'bcrypt';

export async function handleRegister(formData: FormData) {

    const email = (formData.get('email') as string).trim().toLowerCase();
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const fullname = (formData.get('fullname') as string).trim();

    if (!email || !password || !fullname || !confirmPassword) {
        return {
            error: 'Complete todos los campos'
        }
    }

    if (password !== confirmPassword) {
        return {
            error: 'Las contraseñas no coinciden'
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            error: 'Correo electrónico no válido'
        }
    }

    if (password.length < 4) {
        return {
            error: 'La contraseña debe tener al menos 4 caracteres'
        }
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

        return {
            data: {
                email: newUser.email,
                id: newUser.id
            },
            message: 'Usuario creado exitosamente'
        }
    }

    catch (error) {
        console.log(error);
        return {
            error: 'Error al crear el usuario:'
        }
    }
};