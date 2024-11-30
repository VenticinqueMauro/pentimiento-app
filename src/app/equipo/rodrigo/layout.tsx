import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rodrigo Silvestri - Colorista y Supervisor Técnico",
    description: `Rodrigo Silvestri es colorista y supervisor técnico en Pentimento, con amplia experiencia en color y flujos de trabajo de postproducción en cine y series. Ha trabajado en proyectos destacados como El Ángel y series HDR como IOSI S01 y El Presidente S02.`,
    openGraph: {
        title: "Rodrigo Silvestri - Colorista y Supervisor Técnico",
        description: `Con formación en dirección de fotografía y color, Rodrigo Silvestri ha trabajado en proyectos de cine y series de alto perfil. Actualmente, forma parte del equipo de Pentimento, desarrollando flujos de trabajo avanzados de color y postproducción.`,
        images: [{ url: "https://res.cloudinary.com/da305oaa0/image/upload/v1731575398/equipo/f78mvvjzdilh58f2jttf.png" }],
        url: "https://pentimento.cc/equipo/rodrigo",
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
