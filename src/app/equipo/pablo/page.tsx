import { handleGetProjectsByColorist, ProjectWithRelations } from "@/actions/project/getProjects";
import ColoristProfile from "@/components/equipo/ColoristProfile";


export default async function page() {

    const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Pablo Cruz");

    return (
        <ColoristProfile
            fullname='Pablo Cruz'
            description={`Con más de 15 años de experiencia en el campo de la postproducción, Pablo ha dedicado los últimos 11 años a contribuir al crecimiento y éxito de Pentimento. Durante este período, ha tenido la oportunidad de coordinar una variedad de proyectos que han enriquecido tanto su desarrollo profesional como personal, consolidando sus habilidades en la gestión de equipos y fomentando un ambiente de trabajo dinámico y colaborativo\nComo coordinador de postproducción, Pablo se enfoca en optimizar procesos y garantizar que cada proyecto se lleve a cabo con la máxima calidad. Considera esencial el trabajo en equipo para alcanzar los objetivos y basa su enfoque en mantener una comunicación efectiva, además de promover un clima laboral que priorice la búsqueda de soluciones. Su compromiso con el crecimiento de Pentimento es evidente, siempre dispuesto a asumir desafíos que enriquezcan la experiencia del equipo.`}
            profileImg='/equipo/pablo.png'
            IMDBUrl=''
            vimeo={false}
            projects={projects}
        />
    );
}
