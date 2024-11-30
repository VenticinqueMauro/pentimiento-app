/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { ProjectWithRelations } from "@/actions/project/getProjects";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';

interface Props {
    fullname: string;
    description: string;
    IMDBUrl: string;
    profileImg: string;
    reelUrl?: string;
    vimeo: boolean;
    vimeoUrl?: string;
    projects: ProjectWithRelations[];
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function ColoristProfile({ fullname, description, IMDBUrl, profileImg, reelUrl, projects, vimeo }: Props) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [visibleProjectId, setVisibleProjectId] = useState<string | null>(null);

    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const intersectionRatiosRef = useRef<{ [key: string]: number }>({});

    const paragraphs = description.split('\n');

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

    return (
        <section>
            <div className="py-10 max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold uppercase text-center mb-20">{fullname}</h1>
                <h2 className="font-semibold text-2xl uppercase mt-10">Trayectoria</h2>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-16 mt-10">
                    <div className="flex flex-col">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index} className="font-medium md:mr-10 mb-4">{paragraph}</p>
                        ))}
                        <Link href={IMDBUrl} target="_blank" rel="noopener noreferrer" className="text-center font-bold text-3xl mt-10 hover:underline flex items-start justify-center gap-1">
                            <img src='/imdb.svg' alt="IMDB" width={80} height={80} />
                            <span><ExternalLinkIcon className="w-4 h-4" /></span>
                        </Link>
                    </div>
                    <img src={profileImg} alt={fullname} width={399} height={532} className="object-contain" />
                </div>
                {
                    vimeo &&
                    <>
                        <h3 className="font-semibold text-2xl uppercase text-center mb-10 mt-20">Reel</h3>
                        <div className="flex justify-center">
                            <div className="aspect-ratio-16-9">
                                <iframe
                                    title="vimeo-player"
                                    src={reelUrl || "https://player.vimeo.com/video/864889706?h=89b2783d9f"}
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </>
                }
                <h3 className={cn(projects.length > 0 ? "font-semibold text-2xl uppercase text-center mb-10 mt-20" : "hidden")}>Proyectos</h3>
            </div>
            {
                projects.length > 0 &&
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-0 bg-black">
                    <AnimatePresence>
                        {projects.map((project, index) => {
                            const typeSlug = project.type?.name ? slugify(project.type.name) : "undefined";
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
                                    <Link href={`/portfolio/${slugify(typeSlug)}/${project.id}`}>
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
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${isMobile ? (isVisible ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'
                                                        }`}
                                                >
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
            }
        </section>
    );
}
