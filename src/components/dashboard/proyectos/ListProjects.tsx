'use client';

import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import { updateProjectOrder } from "@/actions/project/updateProjectOrder";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCallback, useEffect, useState } from "react";
import EmptyPage from "./EmptyPage";
import { FormCreate } from "./FormCreate";
import SkeletonTable from "./SkeletonTable";
import SortableRow from './SorteableRow';

async function getProjects(page = 1, limit = 10) {
    const result = await handleGetProjects(page, limit);
    return result;
}

export default function ListProjects() {
    const [allProjects, setAllProjects] = useState<ProjectWithRelations[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchProjects = useCallback(async (page: number, limit: number) => {
        try {
            setLoading(true);
            const response: ProjectWithRelations[] = await getProjects(page, limit);
            setAllProjects(response);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast({
                title: "Error al obtener proyectos",
                description: "Hubo un problema al cargar los proyectos. Inténtalo de nuevo.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects(page, limit);
    }, [fetchProjects, page, limit]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setIsUpdating(true);
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
                }).finally(() => {
                    setIsUpdating(false);
                });

                return orderedProjects;
            });
        }
    };

    const handleCreate = () => {
        fetchProjects(page, limit);
    };
    

    return (
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {isUpdating && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50 space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center text-lg font-semibold text-gray-800">
                        Actualizando el orden de los proyectos...
                    </div>
                </div>

            )}
            {loading ? (
                <SkeletonTable />
            ) : !allProjects.length ? (
                <EmptyPage onCreate={() => handleCreate()} />
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row  items-start lg:items-center lg:justify-between  lg:max-w-xl">
                        <h1 className="text-lg font-semibold md:text-2xl">Lista de Proyectos</h1>
                        <FormCreate onCreate={() => handleCreate()} />
                    </div>
                    <div className='me-auto'>
                        <span className="text-sm">
                            Resultados totales: <b>{allProjects.length}</b>
                        </span>
                    </div>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={allProjects.map((project) => project.id)} strategy={verticalListSortingStrategy}>
                            <Table >
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
                                        <SortableRow key={project.id} project={project} onEdit={handleCreate} />
                                    ))}
                                </TableBody>
                            </Table>
                        </SortableContext>
                    </DndContext>
                    <div className="flex flex-col mx-auto items-center mt-10 w-fit  gap-4">
                        <div className="flex items-center space-x-2">
                            <Select onValueChange={(value) => setLimit(Number(value))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Proyectos por página" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Opciones</SelectLabel>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-x-4 items-center">
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                            >
                                Anterior
                            </Button>
                            <span className="text-sm font-bold">Página {page}</span>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </>
            )
            }
        </main >
    );
}
