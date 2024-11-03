'use client';

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";

interface Type {
    id: number;
    name: string;
    subtypes: Subtype[];
}

interface Subtype {
    id: number;
    name: string;
}

interface FilterByTypeAndSubtypeProps {
    onFilterChange: (typeId: number | null, subtypeId: number | null) => void;
}

async function fetchTypes(): Promise<Type[]> {
    const response = await getTypesAndSubtypes();
    return response.data ?? [];
}

export default function FilterByTypeAndSubtype({ onFilterChange }: FilterByTypeAndSubtypeProps) {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<number | null>(null);

    useEffect(() => {
        async function loadTypes() {
            try {
                const types = await fetchTypes();
                setTypes(types);
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        }
        loadTypes();
    }, []);

    const handleTypeChange = (typeId: string) => {
        const id = Number(typeId);
        setSelectedType(id);
        onFilterChange(id, null); // Reinicia el subtipo al cambiar el tipo
    };

    const handleSubtypeChange = (subtypeId: string) => {
        const id = Number(subtypeId);
        onFilterChange(selectedType, id);
    };

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 ">
            <Select onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por Tipo" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                    <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="all">Todos</SelectItem>
                        {types.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {selectedType && (
                <Select onValueChange={handleSubtypeChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por Subtipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Subtipos</SelectLabel>
                            <SelectItem value="all">Todos</SelectItem>
                            {types.find(type => type.id === selectedType)?.subtypes.map((subtype) => (
                                <SelectItem key={subtype.id} value={subtype.id.toString()}>
                                    {subtype.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </div>
    );
}
