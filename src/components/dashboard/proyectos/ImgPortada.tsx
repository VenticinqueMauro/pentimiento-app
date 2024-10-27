'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface Props {
    portadaFile: File | null;
    setPortadaFile: Dispatch<SetStateAction<File | null>>
}

export default function ImgPortada({ portadaFile, setPortadaFile }: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setPortadaFile(file);
        }
    };

    console.log(portadaFile)

    return (
        <div className="flex flex-col items-start gap-4 w-fit">
            <Label htmlFor="mainImageUrl" className="text-right">
                Imagen Principal
            </Label>
            <Input
                id="mainImageUrl"
                name="mainImageUrl"
                required
                className="col-span-3 cursor-pointer"
                type="file"
                onChange={handleChange}
            />
        </div>
    )
}
