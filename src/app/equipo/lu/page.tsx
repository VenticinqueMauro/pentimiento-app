import { handleGetProjectsByColorist, ProjectWithRelations } from "@/actions/project/getProjects";
import ColoristProfile from "@/components/equipo/ColoristProfile";


export default async function page() {

    const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Lu Larrea");

    return (
        <ColoristProfile
            fullname='Lu Larrea'
            description={`Lu Larrea comenzó su carrera como colorista en 2012. Trabajó en postproductoras como Wanka, Comppo y Boat, junto a artistas que admira. Tiene experiencia en formatos diversos, desde cine, publicidad y series, a videoarte y realidad virtual. Coloreó proyectos reconocidos en festivales como BAFICI, Sitges, Festival de Cine de Mar del Plata y Buenos Aires Rojo Sangre.\nEstudió Dirección de Fotografía en la Universidad del Cine (FUC), donde exploró tanto el cine digital como analógico, y se apasionó por el cruce entre la técnica y la expresividad de la imagen, concepto que había abordado previamente a través de la pintura y fotografía.\nEn 2017 recibió una beca para UP.GRADE+, una especialización en color de la DFFB en Berlín. Durante 9 meses se formó con referentes como Dirk Meier, Daniele Siragusano y Harald Brendel, además de asistir a Berlinale, Camerimage, IBC Amsterdam, y visitar las principales postproductoras de Londres y Berlín.\nEn 2022 se sumó al equipo de PENTIMENTO, donde continúa creciendo a través del trabajo en equipo.`}
            profileImg='/equipo/lu.jpg'
            IMDBUrl=''
            vimeo={false}
            projects={projects}
        />
    );
}
