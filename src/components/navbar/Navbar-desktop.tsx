/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HoveredLink, HoveredLink2, Menu, MenuItem } from "../ui/Navbar-menu";
import { ExternalLinkIcon } from "lucide-react";

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
                    <img
                        src="/logo/logo-penti.png"
                        width={200}
                        height={100}
                        alt="Logo"
                    />
                </Link>
                <Menu setActive={setActive} >
                    <HoveredLink href="/">HOME</HoveredLink>
                    <MenuItem setActive={setActive} active={active} item="PORTFOLIO">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink2 href="/portfolio/publicidad">Publicidad</HoveredLink2>
                            <HoveredLink2 href="/portfolio/videoclip">Videoclips</HoveredLink2>
                            <HoveredLink2 href="/portfolio/cine-tv">Cine/TV</HoveredLink2>
                        </div>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="EQUIPO">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {/* Columna Coloristas */}
                            <div className="flex flex-col gap-1">
                                <p className="font-bold uppercase text-gray-300 mb-2">Coloristas</p>
                                <HoveredLink2 href="/equipo/jorge" >Jorge Russo</HoveredLink2>
                                <HoveredLink2 href="/equipo/rodrigo">Rodrigo Silvestri</HoveredLink2>
                                <HoveredLink2 href="/equipo/lu-larrea">Lu Larrea</HoveredLink2>
                            </div>

                            {/* Columna Producción y Coordinación */}
                            <div className="flex flex-col gap-1">
                                <p className="font-bold uppercase text-gray-300 mb-2">Producción y Coordinación</p>
                                <HoveredLink2 href="/equipo/pablo">Pablo Cruz</HoveredLink2>
                                <HoveredLink2 href="/equipo/agustina">Agustina Russo</HoveredLink2>
                            </div>
                        </div>
                    </MenuItem>

                    <HoveredLink href="https://vimeo.com/pentimentocolorgrading" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1">
                        VIMEO
                        <span><ExternalLinkIcon className="w-4 h-4" /></span>
                    </HoveredLink>
                    <HoveredLink href="/contacto">CONTACTO</HoveredLink>
                </Menu>
            </nav>
        </div>
    );
}
