'use client';
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import { Button } from "../ui/button";

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface PortfolioPageProps {
    initialProjects: ProjectWithRelations[];
    typeId?: number;
    subtypeId?: number;
}

// Define los filtros y su mapeo con los nombres en la base de datos
const FILTERS = ["Todos", "Publicidad", "Videoclips", "Cine/TV"];
const FILTERS_MAP: { [key: string]: string | null } = {
    "Todos": null,
    "Publicidad": "publicidad",
    "Videoclips": "videoclip",
    "Cine/TV": "cine-tv",
};

export default function PortfolioPage({ initialProjects, typeId, subtypeId }: PortfolioPageProps) {
    const [projects, setProjects] = useState<ProjectWithRelations[]>(initialProjects);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("Todos");

    console.log(initialProjects)

    const loadMoreProjects = useCallback(async () => {
        setLoading(true);
        const newProjects = await handleGetProjects(page, 20, typeId, subtypeId);
        if (newProjects.length > 0) {
            setProjects((prevProjects) => [...prevProjects, ...newProjects]);
            setPage((prevPage) => prevPage + 1);
        } else {
            setHasMore(false);
        }
        setLoading(false);
    }, [page, typeId, subtypeId]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight
            ) {
                if (!loading && hasMore) {
                    loadMoreProjects();
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, loadMoreProjects]);

    // Filtrar proyectos según la categoría seleccionada
    const filteredProjects = selectedFilter === "Todos"
        ? projects
        : projects.filter((project) => project.type?.name === FILTERS_MAP[selectedFilter]);

    return (
        <div className="">
            <h2 className="text-center text-2xl font-bold my-8">Portafolio</h2>

            {/* Filtro de categorías */}
            <div className="flex justify-center space-x-4 mb-8">
                {FILTERS.map((filter) => (

                    <Button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        size={"default"}
                        variant={"outline"}
                        className={`px-4 py-2 ${selectedFilter === filter && "text-[#0f7bd3d0] font-bold"}`}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Grid de proyectos con animación */}
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]">
                <AnimatePresence>
                    {filteredProjects.map((project) => {
                        const typeSlug = project.type?.name ? slugify(project.type.name) : "undefined";
                        const subtypeSlug = project.subtype?.name ? slugify(project.subtype.name) : "undefined";
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link href={`/portfolio/${slugify(typeSlug)}/${project.subtype ? slugify(subtypeSlug) : ''}/${slugify(project.title)}`} className="relative group">
                                    <img
                                        src={project.mainImageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:opacity-80 transition-all duration-300 aspect-video"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-300 text-white bg-black bg-opacity-70 p-4 text-center">
                                        <h3 className="text-lg font-bold">{project.title}</h3>
                                        <p className="text-sm">
                                            Colorista: {project.colorists.map((colorist) => colorist.fullname).join(", ")}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {loading && <p className="text-center my-8">Cargando más proyectos...</p>}
            {!hasMore && projects.length > 0 && <p className="text-center my-8">No hay más proyectos para mostrar.</p>}
        </div>
    );
}
