'use client';

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { motion } from 'framer-motion';
import { BriefcaseBusinessIcon, HomeIcon, MailIcon, MenuIcon, PlayIcon, UsersIcon } from "lucide-react";
import Image from "next/image";

const menuItems = [
    { title: "HOME", href: "/", icon: <HomeIcon className="text-white" /> },
    {
        title: "PORTFOLIO",
        icon: <BriefcaseBusinessIcon className="text-white" />,
        subItems: [
            { title: "PUBLICIDAD", href: "#publicidad" },
            { title: "VIDEOCLIPS", href: "#videoclips" },
            { title: "CINE/TV", href: "#cinetv" }
        ]
    },
    {
        title: "EQUIPO",
        icon: <UsersIcon className="text-white" />,
        subItems: [
            { title: "JORGE RUSSO", href: "#jorge" },
            { title: "RODRIGO SILVESTRI", href: "#rodrigo" },
            { title: "PRODUCCIÓN Y COORDINACIÓN", href: "#produccion" }
        ]
    },
    { title: "VIMEO", href: "https://vimeo.com/pentimentocolorgrading", icon: <PlayIcon className="text-white" /> },
    { title: "CONTACTO", href: "/contacto", icon: <MailIcon className="text-white" /> }
];

export default function NavbarMobile() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-3 flex justify-between items-center py-2 md:hidden">
            <Image src="/logo/logo-penti.png" width={150} height={100} alt="Logo" />
            <Sheet>
                <SheetTrigger>
                    <MenuIcon size={34} className="text-white" />
                </SheetTrigger>
                <SheetContent className="w-[300px] bg-neutral-950 text-white text-base border-l-neutral-700 overflow-y-auto">
                    <motion.ul
                        className="text-neutral-200 space-y-3 mt-10 mb-20"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.subItems ? (
                                    <>
                                        <button className=" w-full text-left py-2 font-bold flex items-center">
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            {item.title}
                                        </button>
                                        <motion.ul
                                            className="ml-4 space-y-4 m-2 border-l border-neutral-700 pl-3 text-neutral-400 text-sm"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                        >
                                            {item.subItems.map((subItem, subIndex) => (
                                                <motion.li
                                                    key={subIndex}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <a href={subItem.href} className="block">
                                                        {subItem.title}
                                                    </a>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </>
                                ) : (
                                    <motion.a
                                        href={item.href}
                                        className=" py-2 font-bold flex items-center"
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
    )
}
