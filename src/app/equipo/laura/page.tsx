import { handleGetProjectsByColorist, ProjectWithRelations } from "@/actions/project/getProjects";
import ColoristProfile from "@/components/equipo/ColoristProfile";


export default async function page() {

    const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Laura Larrossa");

    return (
        <ColoristProfile
            fullname='Laura Larrossa'
            description={`Laura Larrosa estudió Realización Cinematográfica en el IDAC. Paralelamente comenzó a interesarse por la fotografia fija y aprendió con su padre fotógarafo el trabajo del laboratorista.\nVivió en Barcelona donde descubrió el Intermedio Digital y comenzó a interesarse por ese mundo que incluía el arte de la fotografía en el cine y la soledad del laboratorio.\nEn 2006 comenzó a trabajar en Gotika inicialmente en el área de restauración digital y luego en correccion de color.\nEn 2010 trabajó en Illusion Studios donde coloreó series para Disney y películas animadas estereoscopicas, cómo “Don Gato y su pandilla” y “Gaturro” mientras profundizaba sus estudios sobre Teoría del colorjunto a Salvador Melita.\nTrabajó también en Cinecolor, donde coloreo Edha (primera serie original de Netflix en Argentina), Non Stop, donde coloreo entre muchos otros proyectos, Santa Evita. Tiempo despues trabajó en  Boat formando parte del equipo de Jorge Russo y Rodrigo Silvestri, en series como El grito de las mariposas y Iosi.\nTrabajó con prestigiosos directores y productores como Rodrigo García Blaya, Luis Puenzo, Lita Stantic, Gustavo Santaolalla, Walter Salles, entres muchos otros y también para los principales sellos y plataformas como Disney, Netflix, Paramount, Amazon y HBO.\nDesde 2021, luego de colorear Santa Evita, trabaja con Félix, el Chango, Monti en nuevos proyectos y remasterizando viejas películas.`}
            profileImg='/equipo/laura.jpg'
            IMDBUrl=''
            vimeo={false}
            projects={projects}
        />
    );
}
