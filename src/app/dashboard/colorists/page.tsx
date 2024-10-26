import EmptyPage from "@/components/dashboard/coloristas/EmptyPage";
import ListColorists from "@/components/dashboard/coloristas/ListColorists";
import prisma from "@/lib/db";
import { Colorist } from "@prisma/client";

async function handleGetColorists() {
    'use server';
    try {
        const colorists: Colorist[] = await prisma.colorist.findMany({
            include: {
                projects: true,
            }
        });
        return colorists;
    } catch (error) {
        console.error("Error al obtener coloristas:", error);
        return [];
    }
}

export default async function page() {

    const colorists = await handleGetColorists();

    if (!colorists.length) {
        return (
            <main className="flex flex-1 flex-col gap-4">
                <EmptyPage />
            </main>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4">
            <ListColorists colorists={colorists} />
        </main>
    )
}
