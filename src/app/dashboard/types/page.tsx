import EmptyPage from "@/components/dashboard/types/EmptyPage";
import ListTypesAndSubtypes from "@/components/dashboard/types/ListTypesAndSubtypes";
import prisma from "@/lib/db";
import { Subtype, Type } from "@prisma/client";

export interface TypeWithRelations extends Type {
    subtypes: Subtype[];
}

async function handleGetTypes() {
    'use server';
    try {
        const types: TypeWithRelations[] = await prisma.type.findMany({
            include: {
                subtypes: true,
            }
        });
        return types;
    } catch (error) {
        console.error("Error al obtener los tipos:", error);
        return [];
    }
}

export default async function page() {

    const types = await handleGetTypes();

    if (!types.length) {
        return (
            <main className="flex flex-1 flex-col gap-4">
                <EmptyPage />
            </main>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4">
            <ListTypesAndSubtypes types={types} />
        </main>
    )
}
