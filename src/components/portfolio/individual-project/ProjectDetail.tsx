/* eslint-disable @next/next/no-img-element */
import { ProjectWithRelations } from "@/actions/project/getProjects";
import ProjectGallery from "./GalleryImg";
import InfoItem from "./InfoItem";
import VideoLink from "./VideoLink";

interface ProjectDetailProps {
    project: ProjectWithRelations;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {

    return (
        <div>
            {/* Título con banner (ancho completo) */}
            <div className="relative w-full aspect-[3.5/1] md:aspect-[4/1]">
                <img
                    src={project.mainImageUrl}
                    alt={project.title}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-bold px-4 py-2 text-center">
                        {project.title}
                    </h1>
                </div>
            </div>


            {/* Contenedor para el resto del contenido */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                {/* Video Player */}
                {project.videoLink && (
                    <VideoLink videoLink={project.videoLink} />
                )}

                {/* Galería */}
                <ProjectGallery images={project.gallery} />

                {/* Información en columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(project.description || project.synopsis) && (
                        <div className="bg-gray-50 p-6 rounded shadow-inner order-1 md:order-2">
                            <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                            <p className="text-md text-gray-700 leading-relaxed">
                                {project.description || project.synopsis}
                            </p>
                        </div>
                    )}

                    <div className="space-y-4 order-2 md:order-1">
                        <InfoItem label="Dirección" value={project.director || null} />
                        <InfoItem label="Dirección de Fotografía" value={project.df || null} />
                        <InfoItem label="Productora" value={project.producer || null} />
                        <InfoItem label="Agencia" value={project.agency || null} />
                        <InfoItem label="IMDb" value={project.imdbUrl || null} />
                        <InfoItem
                            label="Colorista"
                            value={project.colorists.map(colorist => colorist.fullname) || null}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}



