import EmptyPage from "@/components/dashboard/admins/EmptyPage";
import ListAdmins from "@/components/dashboard/admins/ListAdmins";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

async function handleGetAdmins() {
    'use server';
    try {
        const admins: User[] = await prisma.user.findMany();
        return admins;
    } catch (error) {
        console.error("Error al obtener coloristas:", error);
        return [];
    }
}

export default async function page() {

    const admins = await handleGetAdmins();

    if (!admins.length) {
        return (
            <main className="flex flex-1 flex-col gap-4">
                <EmptyPage />
            </main>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4">
            <ListAdmins admins={admins} />
        </main>
    )
}
