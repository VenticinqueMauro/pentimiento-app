import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";
import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import ProjectDetail from "@/components/portfolio/ProjectDetail";

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface PortfolioPageProps {
    params: {
        segments?: string[];
    };
}

export default async function PortfolioServerPage({ params }: PortfolioPageProps) {
    const { segments } = params;
    const typeSlug = segments?.[0] || null;
    const potentialTitleOrSubtypeSlug = segments?.[1] || undefined;

    // Obtiene todos los tipos y subtipos
    const { data: typesWithSubtypes } = await getTypesAndSubtypes();
    const type = typesWithSubtypes?.find((t) => slugify(t.name) === typeSlug);

    if (segments?.length === 3) {
        // Caso de tres segmentos, tratamos el tercer segmento como `titleSlug` para vista individual
        const titleSlug = segments[2];
        const subtype = type?.subtypes.find((st) => slugify(st.name) === potentialTitleOrSubtypeSlug);

        // Llama a la función para obtener el proyecto específico
        const project = await handleGetProjects(1, 1, type?.id, subtype?.id, titleSlug);

        return project.length > 0 ? (
            <ProjectDetail project={project[0]} />
        ) : (
            <p>Proyecto no encontrado.</p>
        );
    }

    // Si el proyecto tiene solo dos segmentos, necesitamos distinguir entre `subtype` y `title`.
    if (segments?.length === 2) {
        const isSubtype = type?.subtypes.some((st) => slugify(st.name) === potentialTitleOrSubtypeSlug);
        
        if (isSubtype) {
            // Caso de `type` y `subtype` (vista general)
            const subtype = type?.subtypes.find((st) => slugify(st.name) === potentialTitleOrSubtypeSlug);
            const projects: ProjectWithRelations[] = await handleGetProjects(1, 20, type?.id, subtype?.id);
            return <PortfolioPage initialProjects={projects} typeId={type?.id} subtypeId={subtype?.id} />;
        } else {
            // Caso de `type` y `title` (vista de proyecto individual)
            const project = await handleGetProjects(1, 1, type?.id, undefined, potentialTitleOrSubtypeSlug);
            return project.length > 0 ? (
                <ProjectDetail project={project[0]} />
            ) : (
                <p>Proyecto no encontrado.</p>
            );
        }
    }

    // Si hay solo un segmento, renderiza el portafolio general con el tipo seleccionado
    const typeId = type ? type.id : undefined;
    const projects: ProjectWithRelations[] = await handleGetProjects(1, 20, typeId);

    return <PortfolioPage initialProjects={projects} typeId={typeId} />;
}



// `generateStaticParams` para rutas dinámicas
export async function generateStaticParams() {
    const { data: typesWithSubtypes } = await getTypesAndSubtypes();
    const paths = [];

    paths.push({ segments: [] });

    for (const type of typesWithSubtypes || []) {
        const typeSlug = slugify(type.name);
        paths.push({ segments: [typeSlug] });

        for (const subtype of type.subtypes) {
            const subtypeSlug = slugify(subtype.name);
            paths.push({ segments: [typeSlug, subtypeSlug] });
        }
    }

    return paths;
}
