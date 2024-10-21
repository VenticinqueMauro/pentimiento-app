'use client';
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';

export default function NavbarMobile() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-3 flex justify-between items-center py-2 md:hidden">
            <Image src="/logo.png" width={150} height={100} alt="Logo" />
            <Sheet>
                <SheetTrigger>
                    <MenuIcon size={34} className="text-white" />
                </SheetTrigger>
                <SheetContent className="w-[300px] bg-neutral-950 text-white text-base border-l-neutral-700">
                    <motion.ul
                        className="text-neutral-200 space-y-2 mt-10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <li>
                            <motion.a href="#home" className="block py-2 font-bold" whileHover={{ scale: 1.05 }}>
                                HOME
                            </motion.a>
                        </li>
                        <li>
                            <button className="block w-full text-left py-2 font-bold">
                                PORTFOLIO
                            </button>
                            <motion.ul
                                className="ml-4 space-y-4 border-l border-neutral-700 pl-3 text-neutral-400 text-sm"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <a href="#publicidad" className="block">PUBLICIDAD</a>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <a href="#videoclips" className="block">VIDEOCLIPS</a>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <a href="#cinetv" className="block">CINE/TV</a>
                                </motion.li>
                            </motion.ul>
                        </li>
                        <li>
                            <button className="block w-full text-left py-2 font-bold">
                                EQUIPO
                            </button>
                            <motion.ul
                                className="ml-4 space-y-4 border-l border-neutral-700 pl-3 text-neutral-400 text-sm"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <a href="#jorge" className="block">JORGE RUSSO</a>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <a href="#rodrigo" className="block">RODRIGO SILVESTRI</a>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <a href="#produccion" className="block">PRODUCCIÓN Y COORDINACIÓN</a>
                                </motion.li>
                            </motion.ul>
                        </li>
                        <li>
                            <motion.a href="#vimeo" className="block py-2 font-bold" whileHover={{ scale: 1.05 }}>
                                VIMEO
                            </motion.a>
                        </li>
                        <li>
                            <motion.a href="#contacto" className="block py-2 font-bold" whileHover={{ scale: 1.05 }}>
                                CONTACTO
                            </motion.a>
                        </li>
                    </motion.ul>
                </SheetContent>
            </Sheet>
        </nav>
    )
}
