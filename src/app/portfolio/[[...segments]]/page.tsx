import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";
import {
    handleGetProjectById,
    handleGetProjects,
    ProjectWithRelations,
} from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import ProjectDetail from "@/components/portfolio/individual-project/ProjectDetail";

export const dynamic = 'force-dynamic';

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

interface PortfolioPageProps {
    params: {
        segments?: string[];
    };
}

export async function generateMetadata({ params }: PortfolioPageProps) {
    const { segments } = params;
    const typeSlug = segments?.[0] || null;
    const projectIdSegment = segments?.[1] || null;

    // Base metadata that's common across all cases
    const baseMetadata = {
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "website",
        robots: "index, follow",
        authors: [{ name: "Pentimento Color Grading" }],
    };

    // Obtiene todos los tipos
    const { data: types } = await getTypesAndSubtypes();
    const type = types?.find((t) => slugify(t.name) === typeSlug);

    if (segments?.length === 2) {
        // Caso de ruta: /portfolio/type/id (vista de proyecto individual)
        const projectId = parseInt(projectIdSegment as string, 10);
        if (isNaN(projectId)) {
            return {
                title: "Proyecto No Encontrado | Pentimento Color Grading",
                description: "Lo sentimos, el proyecto que buscas no existe o el ID no es válido. Explora nuestro portafolio para ver otros proyectos.",
                ...baseMetadata,
                openGraph: {
                    ...baseMetadata,
                    title: "Proyecto No Encontrado | Pentimento Color Grading",
                    description: "Lo sentimos, el proyecto que buscas no existe o el ID no es válido. Explora nuestro portafolio para ver otros proyectos.",
                    url: `https://pentimento.cc/portfolio`,
                },
                twitter: {
                    card: 'summary',
                    title: "Proyecto No Encontrado | Pentimento Color Grading",
                    description: "Lo sentimos, el proyecto que buscas no existe o el ID no es válido. Explora nuestro portafolio para ver otros proyectos.",
                }
            };
        }

        // Obtiene el proyecto específico por ID y tipo
        const project = await handleGetProjectById(projectId, type?.id);

        if (!project) {
            return {
                title: "Proyecto No Encontrado | Pentimento Color Grading",
                description: "Lo sentimos, el proyecto que buscas no existe. Explora nuestro portafolio para descubrir otros trabajos.",
                ...baseMetadata,
                openGraph: {
                    ...baseMetadata,
                    title: "Proyecto No Encontrado | Pentimento Color Grading",
                    description: "Lo sentimos, el proyecto que buscas no existe. Explora nuestro portafolio para descubrir otros trabajos.",
                    url: `https://pentimento.cc/portfolio`,
                },
                twitter: {
                    card: 'summary',
                    title: "Proyecto No Encontrado | Pentimento Color Grading",
                    description: "Lo sentimos, el proyecto que buscas no existe. Explora nuestro portafolio para descubrir otros trabajos.",
                }
            };
        }

        const projectDescription = project.description || `${project.title} - Un proyecto de color grading por Pentimento Color Grading`;
        const projectTitle = `${project.title} | Pentimento Color Grading`;
        
        return {
            title: projectTitle,
            description: projectDescription,
            ...baseMetadata,
            keywords: `color grading, post producción, ${type?.name || ''}, ${project.title}, pentimento`,
            openGraph: {
                ...baseMetadata,
                title: projectTitle,
                description: projectDescription,
                images: project.thumbnailUrl ? [
                    {
                        url: project.thumbnailUrl,
                        width: 1200,
                        height: 630,
                        alt: project.title
                    }
                ] : [],
                url: `https://pentimento.cc/portfolio/${typeSlug}/${projectId}`,
            },
            twitter: {
                card: 'summary_large_image',
                title: projectTitle,
                description: projectDescription,
                images: project.thumbnailUrl ? [project.thumbnailUrl] : [],
            }
        };
    } else if (segments?.length === 1) {
        const typeName = type ? type.name : typeSlug;
        const typeId = type ? type.id : undefined;
        const projects: ProjectWithRelations[] = await handleGetProjects(1, 20, typeId);
        const typeDescription = `Explora nuestra colección de trabajos de ${typeName}. Proyectos profesionales de color grading y post producción.`;

        return {
            title: `${typeName} | Portafolio de Pentimento Color Grading`,
            description: typeDescription,
            ...baseMetadata,
            keywords: `color grading, post producción, ${typeName}, pentimento, portafolio`,
            openGraph: {
                ...baseMetadata,
                title: `${typeName} | Portafolio de Pentimento Color Grading`,
                description: typeDescription,
                images: projects[0]?.thumbnailUrl ? [
                    {
                        url: projects[0].thumbnailUrl,
                        width: 1200,
                        height: 630,
                        alt: `Proyectos de ${typeName}`
                    }
                ] : [],
                url: `https://pentimento.cc/portfolio/${typeSlug}`,
            },
            twitter: {
                card: 'summary_large_image',
                title: `${typeName} | Portafolio de Pentimento Color Grading`,
                description: typeDescription,
                images: projects[0]?.thumbnailUrl ? [projects[0].thumbnailUrl] : [],
            }
        };
    } else {
        // Caso de ruta: /portfolio (muestra todos los proyectos)
        const projects: ProjectWithRelations[] = await handleGetProjects(1, 20);
        const portfolioDescription = "Explora nuestro portafolio de color grading y post producción. Trabajos destacados en publicidad, cine y contenido digital.";

        return {
            title: "Portafolio | Pentimento Color Grading",
            description: portfolioDescription,
            ...baseMetadata,
            keywords: "color grading, post producción, portafolio, pentimento, cine, publicidad, contenido digital",
            openGraph: {
                ...baseMetadata,
                title: "Portafolio | Pentimento Color Grading",
                description: portfolioDescription,
                images: projects[0]?.thumbnailUrl ? [
                    {
                        url: projects[0].thumbnailUrl,
                        width: 1200,
                        height: 630,
                        alt: "Portafolio de Pentimento Color Grading"
                    }
                ] : [],
                url: `https://pentimento.cc/portfolio`,
            },
            twitter: {
                card: 'summary_large_image',
                title: "Portafolio | Pentimento Color Grading",
                description: portfolioDescription,
                images: projects[0]?.thumbnailUrl ? [projects[0].thumbnailUrl] : [],
            }
        };
    }
}

export default async function PortfolioServerPage({
    params,
}: PortfolioPageProps) {
    const { segments } = params;
    const typeSlug = segments?.[0] || null;
    const projectIdSegment = segments?.[1] || null;

    // Obtiene todos los tipos
    const { data: types } = await getTypesAndSubtypes();
    const type = types?.find((t) => slugify(t.name) === typeSlug);

    if (segments?.length === 2) {
        // Caso de ruta: /portfolio/type/id (vista de proyecto individual)
        const projectId = parseInt(projectIdSegment as string, 10);
        if (isNaN(projectId)) {
            return <p>ID de proyecto inválido.</p>;
        }

        // Obtiene el proyecto específico por ID y tipo
        const project = await handleGetProjectById(projectId, type?.id);

        return project ? (
            <ProjectDetail project={project} />
        ) : (
            <p>Proyecto no encontrado.</p>
        );
    }

    if (segments?.length === 1) {
        // Caso de ruta: /portfolio/type (muestra proyectos por tipo)
        const typeId = type ? type.id : undefined;
        const projects: ProjectWithRelations[] = await handleGetProjects(
            1,
            20,
            typeId
        );
        return <PortfolioPage initialProjects={projects} typeId={typeId} />;
    }

    // Caso de ruta: /portfolio (muestra todos los proyectos)
    const projects: ProjectWithRelations[] = await handleGetProjects(1, 20);
    return <PortfolioPage initialProjects={projects} />;
}

export async function generateStaticParams() {
    const { data: types } = await getTypesAndSubtypes();
    const paths = [];

    paths.push({ segments: [] }); // Ruta raíz /portfolio

    for (const type of types || []) {
        const typeSlug = slugify(type.name);
        paths.push({ segments: [typeSlug] }); // Ruta /portfolio/type

        // Obtiene todos los proyectos de este tipo
        const projects: ProjectWithRelations[] = await handleGetProjects(
            1,
            1000,
            type.id
        );
        for (const project of projects) {
            paths.push({ segments: [typeSlug, project.id.toString()] }); // Ruta /portfolio/type/id
        }
    }

    return paths;
}
