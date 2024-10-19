import Image from "next/image";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Equipo", href: "/equipo" },
    { name: "Vimeo", href: "/vimeo" },
    { name: "Contacto", href: "/contacto" },
]

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50">        
            <nav className="flex justify-between items-center max-w-6xl mx-auto py-3 bg-transparent ">
                <Image src="/logo.png" width={200} height={100} alt="Logo" />
                <ul className="flex gap-14 items-center uppercase text-white font-semibold">
                    {navItems.map((item) => (
                        <li key={item.name} >
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
