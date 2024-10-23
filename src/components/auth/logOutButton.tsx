'use client';

import { handleLogout } from "@/actions/auth/logout";
import { toast } from "@/hooks/use-toast";

export default function LogOutButton() {

    async function logOut(): Promise<void> {

        try {
            const result = await handleLogout();

            toast({
                description: result?.title ?? result?.description ?? result?.error,
            });

        } catch (error) {
            toast({
                title: 'Error inesperado 😢',
                description: 'Algo salió mal al cerrar sesión, por favor intente de nuevo.',
            });
            console.error('Error en logOut:', error);
        }
    }

    return (
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={logOut}>Salir</button>
    )
}
