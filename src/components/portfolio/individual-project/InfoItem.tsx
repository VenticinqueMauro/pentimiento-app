/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default function InfoItem({ label, value }: { label: string; value?: string | string[] | null }) {
    if (!value) return null;

    if (label.toLowerCase() === "colorista") {
        const getColoristData = (name: string) => {
            switch (name.toLowerCase()) {
                case "jorge russo":
                    return {
                        imageUrl: "/profile/jorge-profile.png",
                        description: "Colorista Senior",
                        url: "jorge",
                    };
                case "rodrigo silvestri":
                    return {
                        imageUrl: "/profile/rodrigo-profile.png",
                        description: "Colorista",
                        url: "rodrigo",
                    };
                case "lu larrea":
                    return {
                        imageUrl: "/profile/lu-profile.png",
                        description: "Colorista",
                        url: "lu",
                    };
                default:
                    return {
                        imageUrl: "/placeholder.svg",
                        description: "N/A",
                        url: "default",
                    };
            }
        };

        // Caso para múltiples coloristas
        if (Array.isArray(value)) {
            return (
                <div className="flex flex-col items-start gap-6">
                    {value.map((colorist, index) => {
                        const coloristData = getColoristData(colorist.trim()); // Trimear para evitar errores por espacios
                        return (
                            <Link href={`/equipo/${coloristData.url}`} key={index} className="flex items-center space-x-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={coloristData.imageUrl} alt={colorist} />
                                        <AvatarFallback>{colorist.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <p className="text-md capitalize flex gap-1">
                                        <span
                                            className="hover:underline"
                                        >
                                            {colorist}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500">{coloristData.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            );
        }

        // Caso para un único colorista
        const coloristData = getColoristData(value.trim());
        return (
            <div className="flex items-center space-x-4">
                <Link href={`/equipo/${coloristData.url}`} className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={coloristData.imageUrl} alt={value} />
                        <AvatarFallback>{value.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <p className="text-md capitalize flex gap-1">
                        <Link href={`/equipo/${coloristData.url}`} className="hover:underline">
                            {value}
                        </Link>
                    </p>
                    <p className="text-sm text-gray-500">{coloristData.description}</p>
                </div>
            </div>
        );
    }

    if (label.toLowerCase() === "imdb") {
        const link = Array.isArray(value) ? value[0] : value;
        return (
            <Link href={link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <img src="/imdb.svg" alt="IMDb Logo" className="w-[60px]" />
                <ExternalLinkIcon className="w-4 h-4" />
            </Link>
        );
    }

    return (
        <p className="text-md capitalize">
            <span className="font-bold">{label}:</span> {value}
        </p>
    );
}
