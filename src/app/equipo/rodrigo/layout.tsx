import Footer from "@/components/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rodrigo Silvestri",
    description: "Rodrigo Silvestri",
};

export default function JorgeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
            <Footer />
        </div>
    )
}
