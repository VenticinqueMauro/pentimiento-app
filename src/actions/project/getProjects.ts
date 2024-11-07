'use server';

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
    include: { type: true; subtypes: true, colorists: true, gallery: true };
}>;


export async function handleGetProjects(
    page: number = 1,
    limit: number = 10,
    typeId?: number,
    subtypeId?: number,
    slug?: string
) {
    try {
        const filter: { typeId?: number; subtypeId?: number, title?: string } = {};

        if (typeId) {
            filter.typeId = typeId;
        }
        if (subtypeId) {
            filter.subtypeId = subtypeId;
        }
        if (slug) filter.title = slug.replace(/-/g, ' ');

        console.log(slug)

        const projects: ProjectWithRelations[] = await prisma.project.findMany({
            where: filter,
            orderBy: { displayOrder: 'asc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                type: true,
                subtypes: true,
                colorists: true,
                gallery: true
            }
        });

        return projects;
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return [];
    }
}
