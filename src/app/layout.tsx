import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import { Nunito } from 'next/font/google';
import "./globals.css";

const font = Nunito({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "Pentimento Color Grading",
  description: "Bienvenidos a Pentimento Color Grading. Ofrecemos servicios de edición y corrección de color para cine, televisión y publicidad. Descubre nuestro portafolio y conoce al equipo detrás de la magia.",
  keywords: ["Pentimento Color Grading", "Edición de video", "Corrección de color", "Cine", "Televisión", "Publicidad", "Portafolio"],
  openGraph: {
    title: "Pentimento Color Grading",
    description: "Explora los servicios de edición y corrección de color de Pentimento Color Grading. Conoce nuestro portafolio y descubre la calidad de nuestro trabajo en cine, televisión y publicidad.",
    url: "https://pentimento.cc",
    siteName: "Pentimento Color Grading",
    locale: "es_AR",
    type: "website"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${font.className} antialiased relative`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
