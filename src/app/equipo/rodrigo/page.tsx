import { handleGetProjectsByColorist } from '@/actions/project/getProjects';
import ColoristProfile from '@/components/equipo/ColoristProfile';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page() {
    const projects = await handleGetProjectsByColorist("Rodrigo Silvestri");

    return (
        <ColoristProfile
            fullname='Rodrigo Silvestri'
            description={`Rodrigo Silvestri inició su formación en el mundo audiovisual desde la educación secundaria, donde tuvo una especialización en comunicación y artes visuales. Estudió realización en la ENERC y cursó la carrera de dirección de fotografía y de ciencia de color en el SICA.\nEn los inicios de su carrera trabajó como eléctrico, segundo y primer ayudante de cámara en cortometrajes y publicidades. También fue director de fotografía de cortometrajes filmados en 16mm y tuvo un primer acercamiento al escaneo ARRI y el intermedio digital en Che Revolution Post.\nEn el año 2010 se volcó de lleno a la postproducción, pasando brevemente por el área de data management en SINSISTEMA para luego dedicarse al color. Dentro de SINSISTEMA participó en el desarrollo de workflows de data management, backup y dailies que hasta el día de hoy siguen siendo estándares en la industria. Trabajó como asistente de Ale Pérez en proyectos como El Ojo del Tiburón, y luego continuó como colorista líder en SINSISTEMA.\nTambién trabajó para Barco Digital / Boat VFX dosificando largometrajes como “Matar a Jesús”. Desde el año 2017 forma parte del equipo de Pentimento como colorista y supervisor técnico. Junto a Jorge Russo desarollaron formas de trabajo en simultáneo para largometrajes como “El Ángel” y series HDR como “IOSI” y “El Presidente”, y fue lead colorist de “El grito de las mariposas”.\nCalificaciones y actividades complementarias:\nOperador profesional de DaVinci Resolve.\nConocimiento técnico avanzado del entorno de imagen digital y color management.\nCapacidad de diseñar workflows y pipelines de color.\nCreación de ShowLUTs.\nFluente en Inglés y Portugués.\nCalibración y evaluación técnica de monitores SDR y HDR`}
            profileImg='/equipo/rodrigo.png'
            IMDBUrl='https://www.imdb.com/name/nm3826997/'
            projects={projects}
            vimeo={false}  
        />
    );
}
