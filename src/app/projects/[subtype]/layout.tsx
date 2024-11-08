import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}