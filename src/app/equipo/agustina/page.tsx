import { handleGetProjectsByColorist, ProjectWithRelations } from "@/actions/project/getProjects";
import ColoristProfile from "@/components/equipo/ColoristProfile";


export default async function page() {

    const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Agustina Russo");

    return (
        <ColoristProfile
            fullname='Agustina Russo'
            description={`Agustina Russo lleva trabajando en Pentimento desde el año 2016, de los cuales se dedica al conformado y color. Es Licenciada en Ciencias de la Comunicación (UBA). Formada como colorista por Jorge Russo (Pentimento) y en Punto Cine Escuela. Certificada del programa de edición DaVinci Resolve (Blackmagic Design)`}
            profileImg='/equipo/agus.png'
            IMDBUrl=''
            vimeo={false}
            projects={projects}
        />
    );
}
