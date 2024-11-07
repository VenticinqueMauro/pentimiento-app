'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

// Define los filtros como una tupla de valores constantes
const FILTERS = ["Todos", "Publicidad", "Videoclips", "Cine/TV"] as const;

// Define el tipo de las claves de FILTERS_MAP basado en los valores de FILTERS
type FilterType = typeof FILTERS[number];

// Define el mapeo con las rutas correspondientes, asegurando que FILTERS_MAP tenga el mismo tipo
const FILTERS_MAP: Record<FilterType, string> = {
    "Todos": "/portfolio",
    "Publicidad": "/portfolio/publicidad",
    "Videoclips": "/portfolio/videoclip",
    "Cine/TV": "/portfolio/cine-tv",
};

export default function FiltersType() {
    const pathname = usePathname();

    // Encuentra el filtro correspondiente según el pathname
    const selectedFilter = FILTERS.find((filter) => FILTERS_MAP[filter] === pathname) || "Todos";

    return (
        <div className="flex justify-center space-x-4 mb-4 md:mb-8 overflow-x-hidden px-6">
            {FILTERS.map((filter) => (
                <Button
                    key={filter}
                    asChild
                    variant={"outline"}
                    className={cn("text-sm hidden lg:block", pathname === FILTERS_MAP[filter] && "text-[#0f7bd3d0] font-bold hover:text-[#0f7bd3d0]")}
                >
                    <Link href={FILTERS_MAP[filter] || '/portfolio'}>
                        {filter}
                    </Link>
                </Button>
            ))}
            <Select
                value={FILTERS_MAP[selectedFilter]}
                onValueChange={(value) => {
                    window.location.href = value;
                }}
            >
                <SelectTrigger id='types' className="w-[180px] lg:hidden">
                    <SelectValue placeholder="Selecciona una categoría">
                        {selectedFilter}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {FILTERS.map((filter) => (
                            <SelectItem key={filter} value={FILTERS_MAP[filter]}>
                                {filter}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
