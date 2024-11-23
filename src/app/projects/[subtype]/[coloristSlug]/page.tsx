import { handleGetProjectsBySubtypeAndColorist } from "@/actions/project/getProjects";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface ColoristPageProps {
    params: {
        subtype: string;
        coloristSlug: string;
    };
}

function decodeSlug(slug: string): string {
    return slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: ColoristPageProps) {
    const { subtype, coloristSlug } = params;
    const subtypeName = decodeSlug(subtype);
    const coloristName = decodeSlug(coloristSlug);

    const projects = await handleGetProjectsBySubtypeAndColorist({
        subtypeName,
        coloristName,
        limit: 1,
    });

    const project = projects[0];

    return {
        title: `Proyectos de ${subtypeName} por ${coloristName}`,
        description: `Explora los proyectos de ${subtypeName} realizados por ${coloristName}.`,
        openGraph: {
            title: `Proyectos de ${subtypeName} por ${coloristName}`,
            description: `Explora los proyectos de ${subtypeName} realizados por ${coloristName}.`,
            images: project?.gallery?.[0]?.url ? [{ url: project.gallery[0].url }] : [],
            url: `https://pentimento.cc/projects/${subtype}/${coloristSlug}`,
            siteName: "Pentimento Color Grading",
            locale: "es_AR",
            type: "website",
        },
    };
}

export default async function ColoristPage({ params }: ColoristPageProps) {
    const { subtype, coloristSlug } = params;

    const subtypeName = decodeSlug(subtype);
    const coloristName = decodeSlug(coloristSlug);

    const projects = await handleGetProjectsBySubtypeAndColorist({
        subtypeName,
        coloristName,
        page: 1,
        limit: 10,
    });

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-destructive mb-4">¡Sin resultados!</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        No se encontraron proyectos asociados al subtipo{" "}
                        <span className="font-semibold">{subtypeName}</span> y colorista{" "}
                        <span className="font-semibold capitalize">{coloristName}</span>.
                    </p>
                    <Link href="/" className="hover:underline">
                        <span><ArrowLeftIcon className="w-4 h-4 inline-block mr-1" /></span>
                        Volver a la home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 md:mt-8 min-h-full">
            <h1 className="text-2xl font-bold mb-4 flex justify-center uppercase">
                Proyectos de {subtypeName} por {coloristName}
            </h1>
            <PortfolioPage initialProjects={projects} />
        </div>
    );
}
