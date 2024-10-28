'use client';

import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";

interface Subtype {
    id: number;
    name: string;
}

interface Type {
    id: number;
    name: string;
    subtypes: Subtype[];
}

interface Props {
    setTypeId: Dispatch<SetStateAction<string | null>>;
    setSubtypeId: Dispatch<SetStateAction<string | null>>;
}

export default function SelectTypeAndSubtype({ setTypeId, setSubtypeId }: Props) {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedSubtype, setSelectedSubtype] = useState<number | null>(null);
    const [subtypes, setSubtypes] = useState<Subtype[]>([]);

    useEffect(() => {
        async function fetchTypesAndSubtypes() {
            try {
                const result = await getTypesAndSubtypes();
                if (result?.data) {
                    setTypes(result.data);
                }
            } catch (error) {
                console.error("Error al obtener tipos y subtipos:", error);
            }
        }
        fetchTypesAndSubtypes();
    }, []);

    const handleTypeChange = (typeId: number) => {
        setSelectedType(typeId);
        setTypeId(typeId.toString()); // Actualiza el padre con el tipo seleccionado
        const type = types.find(t => t.id === typeId);
        setSubtypes(type?.subtypes || []);
        setSelectedSubtype(null);
        setSubtypeId(null); // Restablece el subtipo en el componente padre
    };

    const handleSubtypeChange = (subtypeId: number) => {
        setSelectedSubtype(subtypeId);
        setSubtypeId(subtypeId.toString()); // Actualiza el padre con el subtipo seleccionado
    };

    return (
        <div className="flex items-center gap-10">
            {/* Select de Tipo */}
            <div className="flex flex-col items-start gap-4">
                <label htmlFor="type" className="text-sm font-medium">
                    Tipo
                </label>
                <Select onValueChange={(value: string) => handleTypeChange(Number(value))} value={selectedType?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tipos</SelectLabel>
                            {types.map((type) => (
                                <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Select de Subtipo */}
            <div className="flex flex-col items-start gap-4">
                <label htmlFor="subtype" className="text-sm font-medium">
                    Subtipo (opcional)
                </label>
                <Select onValueChange={(value: string) => handleSubtypeChange(Number(value))} value={selectedSubtype?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona un subtipo" />
                    </SelectTrigger>
                    <SelectContent>
                        {subtypes.length > 0 ? (
                            <SelectGroup>
                                <SelectLabel>Subtipos</SelectLabel>
                                {subtypes.map((subtype) => (
                                    <SelectItem key={subtype.id} value={subtype.id.toString()}>
                                        {subtype.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ) : (
                            <SelectItem value="no-subtype">Sin subtipo</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
