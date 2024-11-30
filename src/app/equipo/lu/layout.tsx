import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lu Larrea - Colorista",
    description: `Página en construcción`,
    openGraph: {
        title: "Lu Larrea - Colorista",
        description: `Página en construcción`,
        images: [{ url: "https://res.cloudinary.com/da305oaa0/image/upload/v1732356459/equipo/rciqetkco3sfpkn47vrj.png" }],
        url: "https://pentimento.cc/equipo/lu",
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "profile",
    }
};

export default function JorgeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
        </div>
    )
}
