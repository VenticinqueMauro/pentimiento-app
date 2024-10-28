'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { handleGetColorists } from '@/actions/project/getColorist';

interface Colorist {
    id: number;
    fullname: string;
}

interface Props {
    setSelectedColorists: Dispatch<SetStateAction<number[]>>
}

export default function ColoristsCheckbox({ setSelectedColorists }: Props) {
    const [colorists, setColorists] = useState<Colorist[]>([]);
    const [selectedColorists, setSelectedColoristsState] = useState<number[]>([]);

    useEffect(() => {
        async function fetchColorists() {
            const result = await handleGetColorists();
            if (result.data) {
                setColorists(result.data);
            } else {
                console.error(result.error || "Error al obtener coloristas");
            }
        }
        fetchColorists();
    }, []);

    const handleCheckboxChange = (coloristId: number) => {
        setSelectedColoristsState((prevSelected) => {
            const updatedSelected = prevSelected.includes(coloristId)
                ? prevSelected.filter((id) => id !== coloristId)
                : [...prevSelected, coloristId];

            setSelectedColorists(updatedSelected); // Pasamos la selección al componente padre
            return updatedSelected;
        });
    };

    return (
        <div className="flex flex-col items-start gap-4">
            <label htmlFor="colorists" className="text-sm font-medium">
                Coloristas
            </label>
            <div className="grid gap-2">
                {colorists.map((colorist) => (
                    <div key={colorist.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`colorist-${colorist.id}`}
                            checked={selectedColorists.includes(colorist.id)}
                            onCheckedChange={() => handleCheckboxChange(colorist.id)}
                        />
                        <Label htmlFor={`colorist-${colorist.id}`} className="text-sm font-medium">
                            {colorist.fullname}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
