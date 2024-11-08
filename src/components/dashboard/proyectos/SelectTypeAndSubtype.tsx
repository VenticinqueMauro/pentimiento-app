'use client';

import { getTypesAndSubtypes } from "@/actions/project/DefaultTypesAndSubtypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";

interface Subtype {
    id: number;
    name: string;
    typeId: number;
}

interface Type {
    id: number;
    name: string;
    subtypes: Subtype[];
}

interface Props {
    setTypeId: Dispatch<SetStateAction<string | null>>;
    setSubtypeIds: Dispatch<SetStateAction<string[]>>;
    initialTypeId?: string | number | null;
    initialSubtypeIds?: (string | number)[] | null;
}

export default function SelectTypeAndSubtype({
    setTypeId,
    setSubtypeIds,
    initialTypeId = null,
    initialSubtypeIds = null,
}: Props) {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<number | null>(
        initialTypeId ? Number(initialTypeId) : null
    );
    const [selectedSubtypes, setSelectedSubtypes] = useState<number[]>(
        initialSubtypeIds ? initialSubtypeIds.map(Number) : []
    );

    useEffect(() => {
        async function fetchTypesAndSubtypes() {
            try {
                const result = await getTypesAndSubtypes();
                if (result?.data) {
                    const validData = result.data.map(type => ({
                        ...type,
                        subtypes: type.subtypes.map(subtype => ({
                            ...subtype,
                            typeId: subtype.typeId ?? 0,
                        })),
                    }));
                    setTypes(validData);
                }
            } catch (error) {
                console.error("Error al obtener tipos y subtipos:", error);
            }
        }
        fetchTypesAndSubtypes();
    }, []);

    const handleTypeChange = (typeId: number) => {
        setSelectedType(typeId);
        setTypeId(typeId.toString());
    };

    const handleSubtypeChange = (
        subtypeId: number,
        checked: boolean | "indeterminate"
    ) => {
        if (checked === "indeterminate") return;

        setSelectedSubtypes((prevSelected) => {
            if (checked) {
                const updated = [...prevSelected, subtypeId];
                setSubtypeIds(updated.map(String));
                return updated;
            } else {
                const updated = prevSelected.filter((id) => id !== subtypeId);
                setSubtypeIds(updated.map(String));
                return updated;
            }
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Select de Tipo */}
            <div className="flex flex-col items-start gap-4">
                <Label htmlFor="type" className="text-sm font-medium">
                    Tipo
                </Label>
                <Select
                    onValueChange={(value: string) => handleTypeChange(Number(value))}
                    value={selectedType?.toString() || ""}
                >
                    <SelectTrigger className="w-fit">
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

            {/* Selección múltiple de Subtipos */}
            <div className="flex flex-col items-start gap-4">
                <Label htmlFor="subtypes" className="text-sm font-medium">
                    Subtipos (Tags)
                </Label>
                {types.length > 0 ? (
                    <div className="flex gap-4 flex-wrap">
                        {types.map((type) => (
                            <div key={type.id} className="mb-2 border rounded p-2">
                                <div className="font-semibold uppercase border-b mb-2">{type.name}</div>
                                {type.subtypes.map((subtype) => (
                                    <div key={subtype.id} className="flex items-center">
                                        <Checkbox
                                            id={`subtype-${subtype.id}`}
                                            checked={selectedSubtypes.includes(subtype.id)}
                                            onCheckedChange={(checked) =>
                                                handleSubtypeChange(subtype.id, checked)
                                            }
                                        />
                                        <label htmlFor={`subtype-${subtype.id}`} className="ml-2">
                                            {subtype.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs">No hay subtipos disponibles</p>
                )}
            </div>
        </div>
    );
}
