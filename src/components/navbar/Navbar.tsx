'use client';
import { usePathname } from "next/navigation";
import { NavbarDesktop } from "./Navbar-desktop";
import NavbarMobile from "./Navbar-mobile";

export default function Navbar() {

    const pathname = usePathname();

    if (pathname === '/auth/login' || pathname.startsWith('/dashboard')) {
        return null;
    }

    return (
        <header>
            <NavbarDesktop />
            <NavbarMobile />
        </header>
    )
}
