'use client';

import { handleGetColorists } from '@/actions/project/getColorist';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Colorist {
    id: number;
    fullname: string;
}

interface Props {
    setSelectedColorists: Dispatch<SetStateAction<number[]>>;
    initialColorists?: number[]; // Prop opcional para edición
}

export default function ColoristsCheckbox({ setSelectedColorists, initialColorists = [] }: Props) {
    const [colorists, setColorists] = useState<Colorist[]>([]);
    const [selectedColorists, setSelectedColoristsState] = useState<number[]>(initialColorists);

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
            {colorists.length === 0 ? (
                <div className="flex items-center justify-center">
                    <Link href='/dashboard/colorists' className='text-sm text-blue-500 underline hover:text-blue-700 flex gap-1 items-center'>
                        Por favor crea coloristas primero
                        <span><ExternalLinkIcon className='w-4 h-4' /></span>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-2">
                    {colorists.map((colorist) => (
                        <div key={colorist.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`colorist-${colorist.id}`}
                                checked={selectedColorists.includes(colorist.id)}
                                onCheckedChange={() => handleCheckboxChange(colorist.id)}
                            />
                            <Label htmlFor={`colorist-${colorist.id}`} className="text-sm font-medium capitalize">
                                {colorist.fullname}
                            </Label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
