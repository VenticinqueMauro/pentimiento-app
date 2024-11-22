import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function InfoItem({ label, value }: { label: string; value?: string | null }) {
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
                case "rodrigo":
                    return {
                        imageUrl: "/profile/rodrigo-profile.png",
                        description: "Colorista",
                        url: "rodrigo",
                    };
                case "lu":
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

        const coloristData = getColoristData(value);

        return (
            <Link href={`/equipo/${coloristData.url}`} className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={coloristData.imageUrl} alt={value} />
                    <AvatarFallback>{value.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-md capitalize">{value}</p>
                    <p className="text-sm text-gray-500">{coloristData.description}</p>
                </div>
            </Link>
        );
    }

    return (
        <p className="text-md capitalize">
            <span className="font-bold">{label}:</span> {value}
        </p>
    );
}
