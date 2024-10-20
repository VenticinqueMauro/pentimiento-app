import { MenuIcon } from "lucide-react";
import Image from "next/image";

export default function NavbarMobile() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-3 flex justify-between items-center py-2 md:hidden">
            <Image src="/logo.png" width={150} height={100} alt="Logo" />
            <MenuIcon size={34} className="text-white " />
        </nav>
    )
}
