import { ProjectWithRelations } from "@/actions/project/getProjects";

interface ProjectDetailProps {
    project: ProjectWithRelations;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
            <img src={project.mainImageUrl} alt={project.title} className="w-full h-auto mb-4" />
            <p className="text-lg mb-2">Colorista: {project.colorists.map((colorist) => colorist.fullname).join(", ")}</p>
            {/* Agrega otros detalles del proyecto según sea necesario */}
            <div className="text-md text-gray-700">{project.description}</div>
        </div>
    );
}
