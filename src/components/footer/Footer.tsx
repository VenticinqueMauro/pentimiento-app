'use client';
import { cn } from "@/lib/utils";
import { MailIcon, MapPinnedIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
    { title: 'Home', href: '/' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'Equipo', href: '/equipo' },
    { title: 'Vimeo', href: 'https://vimeo.com/pentimentocolorgrading' },
    { title: 'Contacto', href: '/contacto' },
];

export default function Footer() {

    const pathname = usePathname();

    if (pathname.startsWith('/dashboard') || pathname === '/') {
        return null;
    }

    return (
        <footer className="flex flex-col px-10 pt-10 pb-5 bg-[#292c2f] w-full">
            <div className="flex flex-col-reverse md:flex-row justify-between items-start">
                <div className="space-y-3  flex flex-col items-center  md:items-start">
                    <ul className="text-white flex justify-center md:justify-start flex-wrap gap-2 font-bold text-lg">
                        {footerLinks.map((link, index) => (
                            <li key={link.title} className="flex items-center">
                                <span className={cn(link.href === '/' && "hidden", "mr-2")}>•</span>
                                <Link
                                    href={link.href}
                                    className={`hover:underline transition-colors duration-300 ${index === 0 ? 'hover:text-red-600' :
                                        index === 1 ? 'hover:text-green-600' :
                                            index === 2 ? 'hover:text-sky-500' :
                                                index === 3 ? 'hover:text-red-600' :
                                                    index === 4 ? 'hover:text-green-600' : ''
                                        }`}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-muted-foreground font-medium">PENTIMENTO COLOR GRADING.</h3>
                    <a href="mailto:pentimento@gmail.com" className="flex items-center gap-1 text-white hover:underline">
                        <span>
                            <MailIcon className="w-4 h-4" />
                        </span>
                        pentimento@gmail.com
                    </a>
                    <div className="flex items-center gap-1 text-white">
                        <span><MapPinnedIcon className="w-4 h-4" /></span>
                        Bonpland 2363, CABA, Argentina
                    </div>
                </div>
                <div className="flex w-full justify-center md:w-fit gap-2 mb-3 md:mb-0">
                    <a href="https://www.facebook.com/pentimentocolorgrading/" target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center text-neutral-100 p-2 bg-[#33383b] hover:bg-red-500 rounded hover:text-white transition-all duration-300 ease'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-brand-facebook">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/pentimentocolorgrading/" target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center text-neutral-100 p-2 bg-[#33383b] hover:bg-green-600 rounded hover:text-white transition-all duration-300 ease'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-brand-instagram">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M16.5 7.5l0 .01" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center  md:flex-row md:justify-center w-full mt-10 md:mt-5">
                <span className="text-sm text-muted-foreground text-center md:text-left">
                    © 2024{" "}
                    <a
                        href="https://www.instagram.com/insiders.agencia/"
                        className="hover:underline hover:text-white"
                    >
                        Insiders™
                    </a>{" "}
                    -{" "}
                    <a
                        href="https://mvdev.vercel.app/"
                        className="hover:underline hover:text-white"
                    >
                        MVDev
                    </a>
                    . All Rights Reserved.
                </span>
            </div>

        </footer>

    )
}
