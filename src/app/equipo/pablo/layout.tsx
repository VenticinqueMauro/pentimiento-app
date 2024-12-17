import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pablo Cruz - Productor, fundador de Pentimento",
    description: `Profesional con más de 15 años de experiencia en postproducción, dedicado 11 años al crecimiento de Pentimento. Coordinador de postproducción especializado en gestión de equipos, optimización de procesos y liderazgo colaborativo.`,
    openGraph: {
        title: "Pablo Cruz - Productor, fundador de Pentimento",
        description: `Profesional con más de 15 años de experiencia en postproducción, dedicado 11 años al crecimiento de Pentimento. Coordinador de postproducción especializado en gestión de equipos, optimización de procesos y liderazgo colaborativo.`,
        images: [{ url: "/equipo/pablo.png" }],
        url: "https://pentimento.cc/equipo/pablo",
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "profile",
    }
};

export default function PabloLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
        </div>
    )
}
