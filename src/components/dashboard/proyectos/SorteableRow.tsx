/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { ProjectWithRelations } from '@/actions/project/getProjects';
import { GripIcon } from 'lucide-react';

export default function SortableRow({ project }: { project: ProjectWithRelations }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <TableCell className="flex items-center gap-2 cursor-grab active:cursor-grabbing group" title="Arrastra para reordenar">
                <GripIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-active:text-foreground group-focus:text-foreground transition-colors duration-100" aria-hidden="true" />
                <span>{project.displayOrder}</span>
            </TableCell>
            <TableCell className="capitalize font-semibold">{project.title}</TableCell>
            <TableCell className="capitalize">
                <span className={project.type?.name ? "" : "text-muted-foreground"}>
                    {project.type?.name || "N/A"}
                </span>
            </TableCell>
            <TableCell className="capitalize">
                <span className={project.subtype?.name ? "" : "text-muted-foreground"}>
                    {project.subtype?.name || "N/A"}
                </span>
            </TableCell>

            <TableCell className="capitalize">
                {project.colorists.length > 0
                    ? project.colorists.map((colorist: any) => colorist.fullname).join(", ")
                    : "N/A"}
            </TableCell>
            <TableCell className="capitalize">
                <span className={project.agency ? "" : "text-muted-foreground"}>
                    {project.agency || "N/A"}
                </span>
            </TableCell>
            <TableCell>
                {/* <FormEdit title={project.title} id={project.id} /> */}
            </TableCell>
        </TableRow>
    );
}
