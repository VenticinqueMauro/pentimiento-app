import Footer from '@/components/footer/Footer';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Pentimento Color Grading - Equipo y Filosofía",
    description: "Descubre la historia y la filosofía de Pentimento Color Grading, un estudio dedicado a la corrección de color para producciones nacionales e internacionales, con un equipo de expertos liderados por Jorge Russo.",
    openGraph: {
        title: "Pentimento Color Grading",
        description: "Conoce nuestro enfoque artístico en la corrección de color y el equipo detrás de Pentimento Color Grading, especialistas en producciones comerciales, largometrajes, series y publicidad.",
        url: "https://www.pentimento.cc/equipo",
        siteName: "Pentimento Color Grading",
        // images: [
        //     {
        //         url: "https://www.tusitio.com/images/pentimento-equipo.jpg",
        //         width: 1200,
        //         height: 630,
        //         alt: "Equipo de Pentimento Color Grading",
        //     },
        // ],
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pentimento Color Grading - Filosofía y Equipo",
        description: "Explora cómo Pentimento Color Grading transforma imágenes en arte a través de la corrección de color.",
        // images: ["https://www.tusitio.com/images/pentimento-equipo.jpg"],
    },
};

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
}
