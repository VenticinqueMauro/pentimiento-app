'use server';

import prisma from "@/lib/db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function handleLogin(formData: FormData) {

    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = formData.get('password') as string;

    if (!email || !password) {
        return {
            error: 'Complete todos los campos'
        };
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return {
                error: 'No se encontró el usuario'
            };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return {
                error: 'Contraseña incorrecta'
            };
        }

        const tokenData = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            id: user.id,
            email,
            fullname: user.fullname,
        };
        const token = jwt.sign(tokenData, `${process.env.JWT_KEY}`);

        const cookiesStore = cookies();

        cookiesStore.set('pentimento_app', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });

        return {
            data: {
                email: user.email,
                id: user.id
            },
            message: 'Usuario autenticado exitosamente'
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Algo salió mal"
        }
    }
}
