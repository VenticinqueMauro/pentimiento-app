'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { FormCreate } from "./FormCreate";
import { getProjects } from "@/app/dashboard/projects/page";
import { ProjectWithRelations } from "@/actions/project/getProjects";
import { Button } from "@/components/ui/button";


export default function ListProjects() {
    const [allProjects, setAllProjects] = useState<ProjectWithRelations[]>([]);
    const [page, setPage] = useState(1);

    async function fetchProjects(page: number) {
        const response = await getProjects(page);
        setAllProjects(response);
    }

    useEffect(() => {
        fetchProjects(page);
    }, [page]);

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between max-w-4xl">
                <h1 className="text-lg font-semibold md:text-2xl">Lista de Proyectos</h1>
                <FormCreate />
            </div>
            <Table className="mt-10 max-w-4xl">
                <TableHeader>
                    <TableRow>
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
                        <TableRow key={project.id} >
                            <TableCell className="capitalize font-semibold">{project.title}</TableCell>
                            <TableCell className="capitalize">{project.type?.name || "N/A"}</TableCell>
                            <TableCell className="capitalize">{project.subtype?.name || "N/A"}</TableCell>
                            <TableCell className="capitalize">
                                {project.colorists.length > 0
                                    ? project.colorists.map((colorist) => colorist.fullname).join(", ")
                                    : "N/A"}
                            </TableCell>
                            <TableCell className="capitalize">{project.agency || "N/A"}</TableCell>
                            <TableCell>
                                {/* <FormEdit title={project.title} id={project.id} /> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
        </div>
    );
}

