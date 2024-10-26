import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
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
                <Toaster />
            </div>
        </div>
    );
}
