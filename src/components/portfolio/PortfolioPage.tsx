/* eslint-disable @next/next/no-img-element */
'use client';
import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import FiltersType from "./FiltersType";

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface PortfolioPageProps {
    initialProjects: ProjectWithRelations[];
    typeId?: number;
    subtypeId?: number;
}


export default function PortfolioPage({ initialProjects, typeId, subtypeId }: PortfolioPageProps) {
    const [projects, setProjects] = useState<ProjectWithRelations[]>(initialProjects);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


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

    return (
        <div className="mt-8">
            <FiltersType />
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]">
                <AnimatePresence>
                    {projects.map((project) => {
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
                                <Link href={`/portfolio/${slugify(typeSlug)}/${project.subtype ? slugify(subtypeSlug) : ''}/${slugify(project.title)}`}>
                                    <div className="overflow-hidden group rounded-none m-0">
                                        <div className="p-0 relative aspect-[4/3] transition-all duration-300 transform">
                                            <img
                                                src={project.thumbnailUrl || "/placeholder.svg"}
                                                alt={project.title}
                                                className="object-cover w-full h-full transition-transform duration-300"
                                                loading="lazy"
                                                decoding="async"
                                                style={{ willChange: "transform" }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                                                    <h3 className="font-semibold text-lg leading-tight mb-1 uppercase">
                                                        {project.title}
                                                    </h3>
                                                    <div className="text-sm text-white/80 flex flex-col space-y-1">
                                                        <span className="mt-3 uppercase">
                                                            {project.colorists?.length === 1 ? 'Colorista' : 'Coloristas'}:
                                                        </span>
                                                        <p className="capitalize text-white">
                                                            {project.colorists?.map((colorist) => colorist.fullname).join(", ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {loading && <p className="text-center my-8">Cargando más proyectos...</p>}
        </div>
    );
}
