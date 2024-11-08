import { handleGetAllSubtypes } from "@/actions/typeAndSubtype/getTypeAndSubtype";
import { handleGetProjectsBySubtype, ProjectWithRelations } from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface SubtypePageProps {
    params: {
        subtype: string;
    };
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function decodeSlug(slug: string): string {
    return slug.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: SubtypePageProps) {
    const subtypeName = decodeSlug(params.subtype);

    // Obtén los proyectos relacionados con el subtipo para extraer la imagen.
    const projects = await handleGetProjectsBySubtype(subtypeName);
    const project = projects[0];

    return {
        title: `Proyectos de ${subtypeName}`,
        description: `Explora los proyectos relacionados con ${subtypeName}.`,
        openGraph: {
            title: `Proyectos de ${subtypeName}`,
            description: `Explora los proyectos relacionados con ${subtypeName}.`,
            images: project?.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
        },
    };
}
export default async function SubtypePage({ params }: SubtypePageProps) {
    const { subtype } = params;
    const subtypeName = decodeSlug(subtype);

    // Obtenemos los proyectos que incluyen este subtipo
    const projects: ProjectWithRelations[] = await handleGetProjectsBySubtype(subtypeName);

    if (projects.length === 0) {
        // Puedes renderizar una página de error personalizada o lanzar un error
        notFound();
    }

    return (
        <div className="mt-4 md:mt-8 min-h-full">
            <h1 className="text-2xl font-bold mb-4 flex justify-center uppercase">#{subtypeName}</h1>
            <PortfolioPage initialProjects={projects} />
        </div>
    );
}

export async function generateStaticParams() {
    const subtypes = await handleGetAllSubtypes();

    return subtypes.map((subtype) => ({
        subtype: slugify(subtype.name),
    }));
}
