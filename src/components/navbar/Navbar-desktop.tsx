"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HoveredLink, HoveredLink2, Menu, MenuItem } from "../ui/Navbar-menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function NavbarDesktop() {
    return (
        <div className="relative w-full hidden md:flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);

    const pathname = usePathname();

    return (
        <div
            className={cn(
                pathname === '/' ? "fixed bg-transparent" : "sticky bg-[#292c2f] backdrop:blur-sm",
                "top-10  py-3 px-3 z-50 w-full",
                className
            )}        >
            <nav className=" max-w-7xl w-full flex items-center mx-auto">
                <Link href="/" className="">
                    <Image src="/logo/logo-penti.png" width={200} height={100} alt="Logo" />
                </Link>
                <Menu setActive={setActive} >
                    <HoveredLink href="/">HOME</HoveredLink>
                    <MenuItem setActive={setActive} active={active} item="PORTFOLIO">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink2 href="/web-dev">Publicidad</HoveredLink2>
                            <HoveredLink2 href="/interface-design">Videoclips</HoveredLink2>
                            <HoveredLink2 href="/seo">Cine/TV</HoveredLink2>
                        </div>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="EQUIPO">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink2 href="/web-dev">Jorge Russo</HoveredLink2>
                            <HoveredLink2 href="/interface-design">Rodrigo Silvestri</HoveredLink2>
                            <HoveredLink2 href="/seo">Producción y coordinación</HoveredLink2>
                        </div>
                    </MenuItem>
                    <HoveredLink href="https://vimeo.com/pentimentocolorgrading">VIMEO</HoveredLink>
                    <HoveredLink href="/">CONTACTO</HoveredLink>
                </Menu>
            </nav>
        </div>
    );
}
