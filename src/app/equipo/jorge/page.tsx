import { handleGetProjectsByColorist, ProjectWithRelations } from '@/actions/project/getProjects';
import ColoristProfile from '@/components/equipo/ColoristProfile';
import React from 'react';


export default async function page() {

    const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Jorge Russo");

    return (
        <ColoristProfile
            fullname='Jorge Russo'
            description={`Jorge Russo es un colorista Senior de amplia trayectoria nacional e internacional, con treinta años de experiencia en la corrección de color digital en cine, publicidad y contenidos para TV.\n
Estudió Realización Cinematográfica en el IDAC (Instituto de Arte Cinematográfico de Avellaneda), especializándose en fotografía e historia del cine. El comienzo de su carrera fue durante la transición del soporte fílmico a video analógico y digital en telecines y scanners, en empresas argentinas como Videocolor, Metrovision, Post Bionica y Che Revolution Post. Ha trabajado con los más destacadxs directorxs de fotografía para productoras de cine, publicidad y agencias nacionales e internacionales.\n
En 2013 creó Pentimento Color Grading, estudio boutique dedicado exclusivamente a la corrección de color digital.\n
Desde pequeño, su pasión por el cine, la música y el arte le permitió desarrollar una particular sensibilidad en el proceso creativo. Profesionalmente lo volcó en la búsqueda de un look de color para la imagen fotográfica del cine y TV.\n
Desde hace varios años organiza ciclos y retrospectivas de cine en Buenos Aires y en su ciudad natal Chivilcoy. Allí es también uno de los organizadores de Raíces, el festival internacional de cine de esa ciudad pampeana.\n
Ha trabajado en filmes con directores como Maria Alvarez, Alejandro Agresti, Tristan Bauer, Cristien Bernard, Fabian Bielinsky, Armando Bó, Sebastian Borensztein, Daniel Burman, Juan José Campanella, Veronica Chen, Leonardo Favio, Paula Hernandez, Martin Hodara, Diego Kaplan, Celina Murga, Luis Ortega, Lucia Puenzo, Luis Puenzo, Sebastian Schindel, Matias Moltrasio, Natalia Smirnoff, Juan Villegas, Ariel Winograd, entre otros.`}
            profileImg='https://res.cloudinary.com/da305oaa0/image/upload/v1731571870/equipo/qyvcvksg35iat4ivsb4a.png'
            IMDBUrl='https://www.imdb.com/name/nm0105230/'
            vimeo={true}
            projects={projects}
        />
    );
}
