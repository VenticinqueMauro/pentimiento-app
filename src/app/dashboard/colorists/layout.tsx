import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Colorists",
    description: "Colorists",
};

export default function DashboardColoristsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
        </section>
    );
}