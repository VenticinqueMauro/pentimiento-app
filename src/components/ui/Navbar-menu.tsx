"use client";
import React from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";


interface HoveredLinkProps extends LinkProps {
    className?: string;
    target?: string;
    rel?: string;
    children: React.ReactNode;
}

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative ">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-white hover:opacity-[0.9] dark:text-white text-lg font-bold tracking-wider"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-0">
                            <motion.div
                                transition={transition}
                                layoutId="active"
                                className="bg-black/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div
                                    layout
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative ms-auto shadow-input flex justify-center space-x-10 px-8 py-6 "
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}: {
    title: string;
    description: string;
    href: string;
    src: string;
}) => {
    return (
        <Link href={href} className="flex space-x-2">
            <Image
                src={src}
                width={140}
                height={70}
                alt={title}
                className="flex-shrink-0 rounded-md shadow-2xl"
            />
            <div>
                <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
                    {title}
                </h4>
                <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, className, target, rel, ...rest }: HoveredLinkProps) => {
    return (
        <Link
            {...rest}
            target={target} // Pasamos `target`
            rel={rel} // Pasamos `rel`
            className={`text-white hover:opacity-[0.9] dark:text-white text-lg font-bold tracking-wider ${className ?? ""}`}
        >
            {children}
        </Link>
    );
};

export const HoveredLink2 = ({ children, ...rest }: React.PropsWithChildren<{ href: string; className?: string; }>) => {
    return (
        <Link
            {...rest}
            className="text-white hover:opacity-[0.9] dark:text-white uppercase"
        >
            {children}
        </Link>
    );
};
