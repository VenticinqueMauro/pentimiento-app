'use server';

import { cookies } from "next/headers";


export async function handleLogout() {

    try {
        cookies().delete('pentimento_app');

        return {
            title: 'Sesión cerrada exitosamente',
            description: 'Esperamos volver a verte pronto'
        }
    } catch (error) {
        return {
            error: `Error al cerrar sesión, ${error}`
        }
    }
}