import EmptyPage from "@/components/dashboard/proyectos/EmptyPage";
import prisma from "@/lib/db";
import { Project } from "@prisma/client";

async function handleGetProjects() {
    'use server';
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const projects: Project[] = await prisma.project.findMany();

        return projects || [];
    } catch (error) {
        console.error("Error al obtener coloristas:", error);
        return [];
    }
}

export default async function page() {

    const projects = await handleGetProjects();

    if (!projects.length) {
        return (
            <main className="flex flex-1 flex-col gap-4">
                <EmptyPage />
            </main>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4">
            {/* <ListColorists colorists={colorists} /> */}
            LISTADO DE PROYECTOS
        </main>
    )
}
