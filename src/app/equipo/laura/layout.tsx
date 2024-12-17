import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Laura Larrosa - Colorista freelance",
    description: `Colorista Senior con extensa trayectoria en cine y TV. Formada en Realización Cinematográfica (IDAC), ha trabajado en proyectos destacados para Netflix, Disney, Paramount, Amazon y HBO. Especializada en corrección de color digital y restauración de películas.`,
    openGraph: {
        title: "Laura Larrosa - Colorista freelance",
        description: `Colorista Senior con extensa trayectoria en cine y TV. Formada en Realización Cinematográfica (IDAC), ha trabajado en proyectos destacados para Netflix, Disney, Paramount, Amazon y HBO. Especializada en corrección de color digital y restauración de películas.`,
        images: [{ url: "/equipo/laura.jpg" }],
        url: "https://pentimento.cc/equipo/laura",
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "profile",
    }
};

export default function LauraLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
        </div>
    )
}
