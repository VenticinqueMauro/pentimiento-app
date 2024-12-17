import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lu Larrea - Colorista freelance",
    description: `Colorista desde 2012, graduada en Dirección de Fotografía (FUC). Especializada en Berlín (DFFB). Experiencia en cine, publicidad, series y videoarte. Sus trabajos han sido reconocidos en festivales como BAFICI, Sitges y Festival de Cine de Mar del Plata.`,
    openGraph: {
        title: "Lu Larrea - Colorista freelance",
        description: `Colorista desde 2012, graduada en Dirección de Fotografía (FUC). Especializada en Berlín (DFFB). Experiencia en cine, publicidad, series y videoarte. Sus trabajos han sido reconocidos en festivales como BAFICI, Sitges y Festival de Cine de Mar del Plata.`,
        images: [{ url: "/equipo/lu.jpg" }],
        url: "https://pentimento.cc/equipo/lu",
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "profile",
    }
};

export default function LuLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
        </div>
    )
}
