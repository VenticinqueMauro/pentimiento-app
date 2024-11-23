import Footer from "@/components/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agustina Russo",
    description: `-.`,
    openGraph: {
        title: "Agustina Russo",
        description: `-`,
        images: [{ url: "https://res.cloudinary.com/da305oaa0/image/upload/v1732356760/equipo/h4ubrehisrrrsvt5zohm.png" }],
        url: "https://pentimento.cc/equipo/agustina",
        siteName: "Pentimento Color Grading",
        locale: "es_AR",
        type: "profile",
    }
};

export default function JorgeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
            <Footer />
        </div>
    )
}
