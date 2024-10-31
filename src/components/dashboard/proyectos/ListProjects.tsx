'use client';

import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from "react";
import EmptyPage from "./EmptyPage";
import { FormCreate } from "./FormCreate";
import SortableRow from './SorteableRow';
import { updateProjectOrder } from "@/actions/project/updateProjectOrder";
import { toast } from "@/hooks/use-toast";
import SkeletonTable from "./SkeletonTable";

async function getProjects(page = 1, limit = 10) {
    const result = await handleGetProjects(page, limit);
    return result;
}

export default function ListProjects() {
    const [allProjects, setAllProjects] = useState<ProjectWithRelations[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);


    async function fetchProjects(page: number) {
        setLoading(true)
        const response: ProjectWithRelations[] = await getProjects(page);
        setAllProjects(response);
        setLoading(false)
    }

    useEffect(() => {
        fetchProjects(page);
    }, [page]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setAllProjects((prevProjects) => {
                const oldIndex = prevProjects.findIndex((project) => project.id === active.id);
                const newIndex = prevProjects.findIndex((project) => project.id === over.id);
                const newOrder = arrayMove(prevProjects, oldIndex, newIndex);

                const orderedProjects = newOrder.map((project, index) => ({
                    ...project,
                    displayOrder: index + 1, // Mantener orden consecutivo comenzando en 1
                }));

                // Llamada a la API para persistir en la base de datos
                updateProjectOrder(
                    orderedProjects.map((project) => ({
                        id: project.id,
                        displayOrder: project.displayOrder,
                    }))
                ).then((result) => {
                    const message = result?.message ?? result?.error;
                    const title = result?.message
                        ? 'Orden actualizado ✅'
                        : 'Error al actualizar el orden 😢';

                    // Mostrar el toast con el mensaje correspondiente
                    if (message) {
                        toast({
                            title,
                            description: message,
                            variant: result?.message ? 'default' : 'destructive',
                        });
                    }
                }).catch((error) => {
                    console.error("Error al actualizar el orden:", error);
                    toast({
                        title: "Error al actualizar el orden 😢",
                        description: "Ocurrió un problema al actualizar el orden. Inténtalo de nuevo.",
                        variant: "destructive",
                    });
                });

                return orderedProjects;
            });
        }
    };

    const handleCreate = () => {
        fetchProjects(page);
    };

    console.log(allProjects.length)

    return (
        <main className="flex flex-1 flex-col gap-4">
            {loading ? (
                <SkeletonTable />
            ) : !allProjects.length ? (
                <EmptyPage />
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between max-w-4xl">
                        <h1 className="text-lg font-semibold md:text-2xl">Lista de Proyectos</h1>
                        <FormCreate onCreate={handleCreate} />
                    </div>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={allProjects.map((project) => project.id)} strategy={verticalListSortingStrategy}>
                            <Table className="mt-10 max-w-4xl">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-fit">Orden</TableHead>
                                        <TableHead className="w-fit">Título</TableHead>
                                        <TableHead className="w-fit">Tipo</TableHead>
                                        <TableHead className="w-fit">Subtipo</TableHead>
                                        <TableHead className="w-fit">Colorista(s)</TableHead>
                                        <TableHead className="w-fit">Agencia</TableHead>
                                        <TableHead className="w-fit">Editar</TableHead>
                                        <TableHead className="w-fit">Eliminar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allProjects.map((project) => (
                                        <SortableRow key={project.id} project={project} />
                                    ))}
                                </TableBody>
                            </Table>
                        </SortableContext>
                    </DndContext>
                    <div className="flex justify-between items-center me-auto mt-10 lg:ms-auto w-fit gap-4">
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Anterior
                        </Button>
                        <span className="text-sm">Página {page}</span>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </>
            )
            }
        </main >
    );
}
