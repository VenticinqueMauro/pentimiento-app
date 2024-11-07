/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ProjectWithRelations } from '@/actions/project/getProjects';
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripIcon } from 'lucide-react';
import { FormEdit } from './FormEdit';
import { AlertProjectDelete } from './Delete';

interface Props {
    project: ProjectWithRelations;
    onEdit?: () => void;
}

export default function SortableRow({ project, onEdit }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
        >
            <TableCell
                className="flex items-center gap-x-2  cursor-grab active:cursor-grabbing group"
                title="Arrastra para reordenar"
                {...attributes}
                {...listeners}
            >
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
                <span className={project.subtypes?.length ? "" : "text-muted-foreground"}>
                    {project.subtypes?.map((subtype: any) => subtype.name).join(", ") || "N/A"}
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
                <FormEdit project={project} onEdit={onEdit} />
            </TableCell>
            <TableCell>
                <AlertProjectDelete title={project.title} projectId={project.id} onDelete={onEdit} />
            </TableCell>
        </TableRow>
    );
}
