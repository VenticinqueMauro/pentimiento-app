import { NavbarDesktop } from "./Navbar-desktop";
import NavbarMobile from "./Navbar-mobile";


export default function Navbar() {
    return (
        <header>
            <NavbarDesktop />
            <NavbarMobile />
        </header>
    )
}
