import { handleGetProjectsBySubtype } from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { notFound } from "next/navigation";

interface SubtypePageProps {
    params: {
        subtype: string;
    };
}

function decodeSlug(slug: string): string {
    return slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: SubtypePageProps) {
    const { subtype } = params;
    const subtypeName = decodeSlug(subtype);

    const projects = await handleGetProjectsBySubtype(subtypeName);
    const project = projects[0];

    return {
        title: `Proyectos de ${subtypeName}`,
        description: `Explora los proyectos relacionados con el subtipo ${subtypeName}.`,
        openGraph: {
            title: `Proyectos de ${subtypeName}`,
            description: `Explora los proyectos relacionados con el subtipo ${subtypeName}.`,
            images: project?.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
            url: `https://pentimento.cc/projects/${subtype}`,
            siteName: "Pentimento Color Grading",
            locale: "es_AR",
            type: "website",
        },
    };
}

export default async function SubtypePage({ params }: SubtypePageProps) {
    const { subtype } = params;
    const subtypeName = decodeSlug(subtype);

    // Fetch projects by subtype
    const projects = await handleGetProjectsBySubtype(subtypeName);

    if (projects.length === 0) {
        notFound();
    }

    return (
        <div className="mt-4 md:mt-8 min-h-full">
            <h1 className="text-2xl font-bold mb-4 flex justify-center uppercase">
                #{subtypeName}
            </h1>
            <PortfolioPage initialProjects={projects} />
        </div>
    );
}
