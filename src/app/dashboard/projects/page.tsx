import { handleGetProjects } from "@/actions/project/getProjects";
import EmptyPage from "@/components/dashboard/proyectos/EmptyPage";
import ListProjects from "@/components/dashboard/proyectos/ListProjects";

// export type ProjectWithRelations = Prisma.ProjectGetPayload<{
//     include: { type: true; subtype: true, colorists: true };
// }>;

export async function getProjects(page: number = 1, limit: number = 10) {
    const result = await handleGetProjects(page, limit)

    return result;
}

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
            {/* <ListColorists colorists={colorists} /> */}
            <ListProjects />
        </main>
    )
}
