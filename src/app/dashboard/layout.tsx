import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] text-foreground">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                {children}
            </div>
        </div>
    );
}
