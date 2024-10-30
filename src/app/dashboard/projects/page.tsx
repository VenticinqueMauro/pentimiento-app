import { handleGetProjects } from "@/actions/project/getProjects";
import EmptyPage from "@/components/dashboard/proyectos/EmptyPage";
import ListProjects from "@/components/dashboard/proyectos/ListProjects";


export default async function page() {

    const projects = await handleGetProjects();

    if (!projects.length) {
        return (
            <main className="flex flex-1 flex-col gap-4">
                <EmptyPage />
            </main>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4">
            <ListProjects />
        </main>
    )
}
