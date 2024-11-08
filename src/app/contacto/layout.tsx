import Footer from "@/components/footer/Footer";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Contacto | Pentimento Color Grading",
    description: "Encuentra la información de contacto de Pentimento Color Grading: dirección, teléfono, y correos electrónicos de nuestros representantes Pablo Cruz y Agustina Russo. Contáctanos para más información.",
    keywords: ["Pentimento Color Grading", "Contacto", "Dirección", "Teléfono", "Email", "Pablo Cruz", "Agustina Russo", "CABA", "Argentina"],
    openGraph: {
        title: "Contacto | Pentimento Color Grading",
        description: "Contacta a Pentimento Color Grading para obtener más información sobre nuestros servicios. Encuentra nuestros teléfonos, correos electrónicos y dirección en CABA, Argentina.",
        url: "https://pentimento.cc/contacto", 
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "website"
    },
};


export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}
