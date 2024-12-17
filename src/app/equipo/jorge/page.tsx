import { handleGetProjectsByColorist, ProjectWithRelations } from '@/actions/project/getProjects';
import ColoristProfile from '@/components/equipo/ColoristProfile';
import React from 'react';


export default async function page() {

    const projects: ProjectWithRelations[] = await handleGetProjectsByColorist("Jorge Russo");

    return (
        <ColoristProfile
            fullname='Jorge Russo'
            description={`Jorge Russo es un colorista Senior de amplia trayectoria nacional e internacional, con treinta años de experiencia en la corrección de color digital en cine, publicidad y contenidos para TV.\nEstudió Realización Cinematográfica en el IDAC (Instituto de Arte Cinematográfico de Avellaneda), especializándose en fotografía e historia del cine. El comienzo de su carrera fue durante la transición del soporte fílmico a video analógico y digital en telecines y scanners, en  empresas argentinas como Videocolor, Metrovision, Post Bionica , Che Revolution Post. Ha trabajado con los más destacadxs directorxs de fotografía para productoras de cine, publicidad y agencias nacionales e internacionales.\nEn 2013 creó Pentimento Color Grading, estudio boutique dedicado exclusivamente a la corrección de color digital.\nDesde pequeño, su pasión por el cine, la música y el arte le permitió desarrollar una particular sensibilidad en el proceso creativo. Profesionalmente lo volcó en la búsqueda de un look de color para la imagen fotográfica del cine y TV.\nDesde hace varios años organiza ciclos y retrospectivas de cine en Buenos Aires y en su ciudad natal Chivilcoy. Allí es también uno de los organizadores de Raíces, el festival internacional de cine de esa ciudad pampeana.\nHa trabajado en filmes y series con directores como Maria Alvarez, Alejandro Agresti, Tristan Bauer, Cristian Bernard, Fabian Bielinsky, Armando Bó, Sebastian Borensztein, Daniel Burman, Juan José Campanella, Veronica Chen,  Leonardo Favio, Paula Hernandez, Martin Hodara, Diego Kaplan, Celina Murga, Luis Ortega, Lucia Puenzo, Luis Puenzo, Daniel Rosenfeld, Sebastian Schindel, Natalia Smirnoff, Bruno Stagnaro, Juan Villegas, Ariel Winograd, entre otros. Actualmente, en paralelo con Pentimento trabaja como colorista en Quanta Post  Bs As y Quanta Sao Paulo.`}
            profileImg='/equipo/jorge.png'
            IMDBUrl='https://www.imdb.com/name/nm0105230/'
            vimeo={true}
            reelUrl='https://player.vimeo.com/video/864889706'
            projects={projects}
        />
    );
}
