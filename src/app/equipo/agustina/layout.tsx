import Footer from "@/components/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agustina Russo - Coordinadora, colorista asistente",
    description: `Licenciada en Ciencias de la Comunicación (UBA), colorista formada por Jorge Russo y Punto Cine Escuela. Certificada en DaVinci Resolve. Trabaja en Pentimento desde 2016 en conformado y color.`,
    openGraph: {
        title: "Agustina Russo - Coordinadora, colorista asistente",
        description: `Licenciada en Ciencias de la Comunicación (UBA), colorista formada por Jorge Russo y Punto Cine Escuela. Certificada en DaVinci Resolve. Trabaja en Pentimento desde 2016 en conformado y color.`,
        images: [{ url: "/equipo/agus.png" }],
        url: "https://pentimento.cc/equipo/agustina",
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "profile",
    }
};

export default function AgustinaLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
            <Footer />
        </div>
    )
}
