'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setPortadaFile: Dispatch<SetStateAction<File | null>>;
}

export default function ImgPortada({ setPortadaFile }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPortadaFile(file);
        }
    };

    return (
        <div className="flex flex-col items-start gap-4 w-fit">
            <Label htmlFor="mainImageUrl">Imagen Principal</Label>
            <Input
                id="mainImageUrl"
                name="mainImageUrl"
                required
                type="file"
                onChange={handleChange}
            />
        </div>
    );
}
