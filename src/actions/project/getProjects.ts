'use server';

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
    include: { type: true; subtype: true, colorists: true };
}>;

export async function handleGetProjects(page: number = 1, limit: number = 10) {
    try {
        const projects: ProjectWithRelations[] = await prisma.project.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                type: true,
                subtype: true,
                colorists: true
            }
        });
        return projects;
    } catch (error) {
        console.error("Error al obtener coloristas:", error);
        return [];
    }
}