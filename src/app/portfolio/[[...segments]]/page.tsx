import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";
import {
    handleGetProjectById,
    handleGetProjects,
    ProjectWithRelations,
} from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import ProjectDetail from "@/components/portfolio/individual-project/ProjectDetail";

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

    // Obtiene todos los tipos
    const { data: types } = await getTypesAndSubtypes();
    const type = types?.find((t) => slugify(t.name) === typeSlug);

    if (segments?.length === 2) {
        // Caso de ruta: /portfolio/type/id (vista de proyecto individual)
        const projectId = parseInt(projectIdSegment as string, 10);
        if (isNaN(projectId)) {
            return {
                title: "ID de proyecto inválido",
                description: "El ID de proyecto proporcionado no es válido.",
            };
        }

        // Obtiene el proyecto específico por ID y tipo
        const project = await handleGetProjectById(projectId, type?.id);

        if (!project) {
            return {
                title: "Proyecto no encontrado",
                description: "No se pudo encontrar el proyecto especificado.",
            };
        }

        // Genera la metadata para el proyecto individual
        return {
            title: project.title,
            description: project.description || "Descripción del proyecto.",
            openGraph: {
                title: project.title,
                description: project.description || "Descripción del proyecto.",
                images: project.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
                url: `https://pentimento.cc/portfolio/${typeSlug}/${projectId}`,
                siteName: "Pentimento Color Grading",
                locale: "es_AR",
                type: "website",
            },
        };
    } else if (segments?.length === 1) {
        // Caso de ruta: /portfolio/type (muestra proyectos por tipo)
        const typeName = type ? type.name : typeSlug; // Si el tipo no se encuentra, usa el slug
        const typeId = type ? type.id : undefined;

        // Obtiene los proyectos de este tipo
        const projects: ProjectWithRelations[] = await handleGetProjects(
            1,
            20,
            typeId
        );

        if (projects.length === 0) {
            return {
                title: `Proyectos de ${typeName}`,
                description: `No hay proyectos relacionados con ${typeName}.`,
                openGraph: {
                    title: `Proyectos de ${typeName}`,
                    description: `No hay proyectos relacionados con ${typeName}.`,
                    images: [],
                    url: `https://pentimento.cc/portfolio/${typeSlug}`,
                    siteName: "Pentimento Color Grading",
                    locale: "es_AR",
                    type: "website",
                },
            };
        }

        const project = projects[0]; // Usa el primer proyecto para la imagen

        return {
            title: `Proyectos de ${typeName}`,
            description: `Explora los proyectos relacionados con ${typeName}.`,
            openGraph: {
                title: `Proyectos de ${typeName}`,
                description: `Explora los proyectos relacionados con ${typeName}.`,
                images: project.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
                url: `https://pentimento.cc/portfolio/${typeSlug}`,
                siteName: "Pentimento Color Grading",
                locale: "es_AR",
                type: "website",
            },
        };
    } else {
        // Caso de ruta: /portfolio (muestra todos los proyectos)
        const projects: ProjectWithRelations[] = await handleGetProjects(1, 20);

        if (projects.length === 0) {
            return {
                title: "Portafolio",
                description: "No hay proyectos disponibles.",
                openGraph: {
                    title: "Portafolio",
                    description: "No hay proyectos disponibles.",
                    images: [],
                    url: `https://pentimento.cc/portfolio`,
                    siteName: "Pentimento Color Grading",
                    locale: "es_AR",
                    type: "website",
                },
            };
        }

        const project = projects[0]; // Usa el primer proyecto para la imagen

        return {
            title: "Portafolio",
            description: "Explora todos los proyectos.",
            openGraph: {
                title: "Portafolio",
                description: "Explora todos los proyectos.",
                images: project.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
                url: `https://pentimento.cc/portfolio`,
                siteName: "Pentimento Color Grading",
                locale: "es_AR",
                type: "website",
            },
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
