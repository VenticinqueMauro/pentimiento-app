import EmptyPage from "@/components/dashboard/types/EmptyPage";
import ListTypesAndSubtypes from "@/components/dashboard/types/ListTypesAndSubtypes";
import prisma from "@/lib/db";
import { Subtype, Type } from "@prisma/client";

export interface TypeWithRelations extends Type {
    subtypes: Subtype[];
}

export interface SubtypeWithoutType extends Subtype {
    type: Type | null;
}

async function handleGetTypesAndSubtypes() {
    'use server';
    try {
        // Obtener todos los tipos con sus subtipos
        const types: TypeWithRelations[] = await prisma.type.findMany({
            include: {
                subtypes: true,
            },
        });

        // Obtener subtipos que no están asociados a ningún tipo
        const subtypesWithoutType: Subtype[] = await prisma.subtype.findMany({
            where: {
                typeId: null,
            },
        });

        return {
            types,
            subtypesWithoutType,
        };
    } catch (error) {
        console.error("Error al obtener los tipos y subtipos:", error);
        return {
            types: [],
            subtypesWithoutType: [],
        };
    }
}

export default async function Page() {
    const { types, subtypesWithoutType } = await handleGetTypesAndSubtypes();

    if (!types.length && !subtypesWithoutType.length) {
        return (
            <main className="flex flex-1 flex-col gap-4">
                <EmptyPage />
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col gap-4">
            <ListTypesAndSubtypes types={types} subtypesWithoutType={subtypesWithoutType} />
        </main>
    );
}