import ListProjects from "@/components/dashboard/proyectos/ListProjects";

export const dynamic = 'force-dynamic';

export default async function page() {

    return (
        <ListProjects />
    )
}
