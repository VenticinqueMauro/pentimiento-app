/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { ProjectWithRelations } from '@/actions/project/getProjects';

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
            className="cursor-grab active:cursor-grabbing">
            <TableCell >{project.displayOrder}</TableCell>
            <TableCell className="capitalize font-semibold">{project.title}</TableCell>
            <TableCell className="capitalize">{project.type?.name || "N/A"}</TableCell>
            <TableCell className="capitalize">{project.subtype?.name || "N/A"}</TableCell>
            <TableCell className="capitalize">
                {project.colorists.length > 0
                    ? project.colorists.map((colorist: any) => colorist.fullname).join(", ")
                    : "N/A"}
            </TableCell>
            <TableCell className="capitalize">{project.agency || "N/A"}</TableCell>
            <TableCell>
                {/* <FormEdit title={project.title} id={project.id} /> */}
            </TableCell>
        </TableRow>
    );
}
