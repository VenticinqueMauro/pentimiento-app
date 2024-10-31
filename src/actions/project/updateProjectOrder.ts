'use server';

import prisma from "@/lib/db";

export type ProjectOrderUpdate = {
    id: number;
    displayOrder: number;
};

export async function updateProjectOrder(projects: ProjectOrderUpdate[]) {
    try {
        // Utilizar una transacción para actualizar el displayOrder de cada proyecto
        await prisma.$transaction(
            projects.map((project) =>
                prisma.project.update({
                    where: { id: project.id },
                    data: { displayOrder: project.displayOrder },
                })
            )
        );
        return { message: "Orden de proyectos actualizado exitosamente" };
    } catch (error) {
        console.error("Error al actualizar el orden de los proyectos:", error);
        return { error: "Error al actualizar el orden de los proyectos" };
    }
}
