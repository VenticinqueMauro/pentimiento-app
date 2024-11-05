import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";
import { handleGetProjects, ProjectWithRelations } from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";

export function slugify(text: string): string {
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
    const subtypeSlug = segments?.[1] || null;
    const titleSlug = segments?.[2] || null; // Slug del título del proyecto

    // Obtiene todos los tipos y subtipos
    const { data: typesWithSubtypes } = await getTypesAndSubtypes();

    // Encuentra el ID del tipo y subtipo según los nombres (slugs)
    const type = typesWithSubtypes?.find((t) => slugify(t.name) === typeSlug);
    const subtype = type?.subtypes.find((st) => slugify(st.name) === subtypeSlug);

    const typeId = type ? type.id : undefined;
    const subtypeId = subtype ? subtype.id : undefined;

    // Llamada a `handleGetProjects` con el filtro `titleSlug` si está presente
    const projects: ProjectWithRelations[] = await handleGetProjects(1, 20, typeId, subtypeId, titleSlug ?? undefined);

    return (
        <PortfolioPage
            initialProjects={projects}
            typeId={typeId}
            subtypeId={subtypeId}
        />
    );
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
