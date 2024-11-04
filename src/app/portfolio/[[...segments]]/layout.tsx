import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata: Metadata = {
    title: "Portfolio",
    description: "Portfolio",
};

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>{children}</div>
    )
}
