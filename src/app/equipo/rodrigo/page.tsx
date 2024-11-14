import { handleGetProjectsByColorist } from '@/actions/project/getProjects';
import ColoristProfile from '@/components/equipo/ColoristProfile';
import React from 'react';

export default async function page() {
    const projects = await handleGetProjectsByColorist("Rodrigo Silvestri");

    return (
        <ColoristProfile
            fullname='Rodrigo Silvestri'
            description={`Rodrigo Silvestri inició su formación en el mundo audiovisual desde la educación secundaria, donde tuvo una especialización en comunicación y artes visuales. Estudió realización en la ENERC y completó los cursos de color y la carrera de dirección de fotografía en el SICA.\n
Desde joven, trabajó como eléctrico, loader y primer ayudante de cámara en cortometrajes y publicidades. También fue director de fotografía de varios cortometrajes filmados en 16mm y tuvo un primer acercamiento al escaneo ARRI y el intermedio digital en Che Revolution Post.\n
En el año 2010 se volcó a la postproducción, pasando brevemente por el área de data management en SINSISTEMA para luego dedicarse íntegramente al color. Dentro de SINSISTEMA desarrollaron workflows de data management, backup y dailies que hasta el día de hoy siguen siendo estándares en la industria.\n
Trabajó como asistente de Ale Pérez en largometrajes como El Ojo del Tiburón, y continuó como colorista en SINSISTEMA hasta su disolución en 2016. También trabajó para Barco Digital y Boat VFX. Desde el año 2017 forma parte del equipo de Pentimento como colorista y supervisor técnico. Junto a Jorge Russo desarrollaron formas de trabajo en simultáneo para largometrajes como El Ángel y series HDR como IOSI S01 y El Presidente S02.`}
            profileImg='https://res.cloudinary.com/da305oaa0/image/upload/v1731575398/equipo/f78mvvjzdilh58f2jttf.png'
            IMDBUrl='https://www.imdb.com/name/nm3826997/'
            projects={projects}
            vimeo={false}  
        />
    );
}
