import Footer from "@/components/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pablo Cruz",
    description: `-.`,
    openGraph: {
        title: "Pablo Cruz",
        description: `-`,
        images: [{ url: "https://res.cloudinary.com/da305oaa0/image/upload/v1732356621/equipo/qnwpb6hpfgbpb7jqpaj0.png" }],
        url: "https://pentimento.cc/equipo/pablo",
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
