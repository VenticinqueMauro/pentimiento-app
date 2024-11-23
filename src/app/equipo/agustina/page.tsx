import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";


export default async function page() {

    // const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Lu Larrea");

    // return (
    //     <ColoristProfile
    //         fullname='Lu Larrea'
    //         description={`Página en construcción`}
    //         profileImg='https://res.cloudinary.com/da305oaa0/image/upload/v1732356459/equipo/rciqetkco3sfpkn47vrj.png'
    //         IMDBUrl='#'
    //         vimeo={false}
    //         projects={projects}
    //     />
    // );

    return (
        <div className="bg-white p-4 md:p-8 lg:p-12 h-screen flex flex-col items-center gap-4 justify-center">
            <h1 className="text-center text-3xl font-bold tracking-tight">Página en construcción</h1>
            <Link href="/" className="hover:underline">
                <span><ArrowLeftIcon className="w-4 h-4 inline-block mr-1" /></span>
                Volver a la home
            </Link>
        </div>
    )
}
