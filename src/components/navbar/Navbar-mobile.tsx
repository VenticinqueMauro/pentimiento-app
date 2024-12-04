/* eslint-disable @next/next/no-img-element */
'use client';

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { BriefcaseBusinessIcon, HomeIcon, Instagram, MailIcon, MenuIcon, PlayIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    subItems?: SubItem[];
};

type SubItem = {
    section?: string;
    title?: string;
    href?: string;
    children?: SubItem[];
};


const menuItems: MenuItem[] = [
    { title: "HOME", href: "/", icon: <HomeIcon className="text-white" /> },
    {
        title: "PORTFOLIO",
        icon: <BriefcaseBusinessIcon className="text-white" />,
        subItems: [
            { title: "PUBLICIDAD", href: "/portfolio/publicidad" },
            { title: "VIDEOCLIPS", href: "/portfolio/videoclip" },
            { title: "CINE/TV", href: "/portfolio/cine-tv" }
        ]
    },
    {
        title: "EQUIPO",
        icon: <UsersIcon className="text-white" />,
        subItems: [
            {
                section: "Coloristas",
                children: [
                    { title: "JORGE RUSSO", href: "/equipo/jorge" },
                    { title: "RODRIGO SILVESTRI", href: "/equipo/rodrigo" },
                    { title: "LU LARREA", href: "/equipo/lu" }
                ]
            },
            {
                section: "Producción y Coordinación",
                children: [
                    { title: "PABLO CRUZ", href: "/equipo/pablo" },
                    { title: "AGUSTINA RUSSO", href: "/equipo/agustina" }
                ]
            }
        ]
    },
    { title: "VIMEO", href: "https://vimeo.com/pentimentocolorgrading", icon: <PlayIcon className="text-white" /> },
    { title: "INSTAGRAM", href: "https://www.instagram.com/pentimentocolorgrading/", icon: <Instagram className="text-white" /> },
    { title: "CONTACTO", href: "/contacto", icon: <MailIcon className="text-white" /> }
];



export default function NavbarMobile() {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                pathname === '/'
                    ? "bg-transparent fixed w-full"
                    : "bg-[#292c2f] backdrop:blur-sm sticky",
                "top-0 left-0 w-full z-50 px-3 flex justify-between items-center py-2 md:hidden"
            )}
        >
            <Link href="/">
                <img
                    src="/logo/logo-penti.png"
                    width={100}
                    height={100}
                    alt="Logo"
                />
            </Link>
            <Sheet>
                <SheetTrigger>
                    <MenuIcon size={34} className="text-white" />
                </SheetTrigger>
                <SheetContent className="w-[300px] bg-neutral-950 text-white text-base border-l-neutral-700 overflow-y-auto">
                    <motion.ul
                        className="text-neutral-200 space-y-3 mt-5 mb-20"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.subItems ? (
                                    <>
                                        <div className="w-full text-left">
                                            {/* Ajustar el Link para PORTFOLIO y EQUIPO */}
                                            <Link
                                                href={item.title === "PORTFOLIO" ? "/portfolio" : item.title === "EQUIPO" ? "/equipo" : ""}
                                                className="font-bold flex items-center justify-between py-2 hover:opacity-80"
                                            >
                                                <div className="flex items-center">
                                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                                    {item.title}
                                                </div>
                                            </Link>
                                            {/* Menú desplegable */}
                                            <motion.div
                                                className="ml-4 space-y-4 m-2 pl-3 text-neutral-400 text-sm"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                            >
                                                {item.subItems[0]?.section ? (
                                                    <div className="space-y-4">
                                                        {item.subItems.map((subSection, subIndex) => (
                                                            <div key={subIndex}>
                                                                <p className="font-bold text-gray-300 mb-2">
                                                                    {subSection.section}
                                                                </p>
                                                                {subSection.children?.map((child, childIndex) => (
                                                                    <motion.a
                                                                        key={childIndex}
                                                                        href={child.href}
                                                                        className="block hover:opacity-80 mb-2"
                                                                        initial={{ opacity: 0, y: -10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        {child.title}
                                                                    </motion.a>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    item.subItems.map((subItem, subIndex) => (
                                                        <motion.a
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            className="block hover:opacity-80"
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {subItem.title}
                                                        </motion.a>
                                                    ))
                                                )}
                                            </motion.div>
                                        </div>
                                    </>
                                ) : (
                                    <motion.a
                                        href={item.href}
                                        target={item.title === "VIMEO" ? "_blank" : undefined}
                                        rel={item.title === "VIMEO" ? "noopener noreferrer" : undefined}
                                        className="py-2 font-bold flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {item.icon && <span className="mr-2">{item.icon}</span>}
                                        {item.title}
                                    </motion.a>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                </SheetContent>
            </Sheet>
        </nav>
    );
}


