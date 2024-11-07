/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';
import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState, useRef } from "react";
import FiltersType from "./FiltersType";
import { useMediaQuery } from 'react-responsive';

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface PortfolioPageProps {
    initialProjects: ProjectWithRelations[];
    typeId?: number;
    subtypeId?: number;
}

export default function PortfolioPage({ initialProjects, typeId, subtypeId }: PortfolioPageProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [projects, setProjects] = useState<ProjectWithRelations[]>(initialProjects);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [visibleProjectId, setVisibleProjectId] = useState<string | null>(null);

    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const intersectionRatiosRef = useRef<{ [key: string]: number }>({});

    useEffect(() => {
        if (isMobile) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const projectId = entry.target.getAttribute('data-id');
                        if (projectId) {
                            if (entry.isIntersecting) {
                                intersectionRatiosRef.current[projectId] = entry.intersectionRatio;
                            } else {
                                delete intersectionRatiosRef.current[projectId];
                            }
                        }
                    });

                    // Encontrar el projectId con el mayor intersectionRatio
                    let maxRatio = 0;
                    let mostVisibleProjectId = null;
                    for (const [projectId, ratio] of Object.entries(intersectionRatiosRef.current)) {
                        if (ratio > maxRatio) {
                            maxRatio = ratio;
                            mostVisibleProjectId = projectId;
                        }
                    }

                    setVisibleProjectId(mostVisibleProjectId);
                },
                {
                    root: null,
                    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
                }
            );

            projectRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            return () => {
                projectRefs.current.forEach((ref) => {
                    if (ref) observer.unobserve(ref);
                });
            };
        }
    }, [isMobile]);

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
        <div className="mt-4 md:mt-8 min-h-full">
            <FiltersType />
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-0 bg-[#292c2f]">
                <AnimatePresence>
                    {projects.map((project, index) => {
                        const typeSlug = project.type?.name ? slugify(project.type.name) : "undefined";
                        const subtypeSlug = project.subtype?.name ? slugify(project.subtype.name) : "undefined";
                        const isVisible = isMobile ? visibleProjectId === project.id.toString() : false;

                        return (
                            <motion.div
                                className="m-0 p-0"
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                ref={(el) => {
                                    projectRefs.current[index] = el;
                                }}
                                data-id={project.id}
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
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${isMobile ? (isVisible ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'}`}>
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
        </div>
    );
}
