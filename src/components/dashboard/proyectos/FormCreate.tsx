'use client';

import { SubmitButton } from "@/components/auth/submitButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import ImgPortada from "./ImgPortada";
import { handleCreateProject } from "@/actions/project/create";
import { toast } from "@/hooks/use-toast";

const colorists = [
    { id: 1, fullname: "Colorista 1" },
    { id: 2, fullname: "Colorista 2" },
    { id: 3, fullname: "Colorista 3" },
];

export function FormCreate() {

    const [open, setOpen] = useState(false);
    const [portadaFile, setPortadaFile] = useState<File | null>(null);

    const handleSubmit = async (formData: FormData) => {
        formData.append('mainImageUrl', portadaFile as File);

        const result = await handleCreateProject(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Proyecto creado 😃!' : 'Error al crear proyecto 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
        }
    };


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="mt-4" onClick={() => setOpen(true)}>Agregar proyecto</Button>
            </SheetTrigger>
            <SheetContent className="max-w-3xl mx-auto max-h-screen overflow-y-auto" side='bottom'>
                <SheetHeader>
                    <SheetTitle>Crear proyecto</SheetTitle>
                    <SheetDescription>
                        Ingresa los datos necesarios para crear un nuevo proyecto
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="title" className="text-right">
                            Título
                        </Label>
                        <Input id="title" name="title" className="col-span-3" placeholder="Título del proyecto" />
                    </div>

                    <ImgPortada setPortadaFile={setPortadaFile} />

                    <div className="flex items-center  gap-10">

                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="type" className="text-sm font-medium">
                                Tipo
                            </label>
                            <Select >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecciona un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tipos de Proyecto</SelectLabel>
                                        <SelectItem value="publicidad">Publicidad</SelectItem>
                                        <SelectItem value="videoclip">Videoclip</SelectItem>
                                        <SelectItem value="tv-cine">TV/Cine</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <label htmlFor="subtype" className="text-sm font-medium">
                                Subtipo (opcional)
                            </label>
                            <Select >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecciona un subtipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Subtipos de Proyecto</SelectLabel>
                                        <SelectItem value="comercial">Comercial</SelectItem>
                                        <SelectItem value="documental">Documental</SelectItem>
                                        <SelectItem value="cortometraje">Cortometraje</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <label htmlFor="colorists" className="text-sm font-medium">
                            Coloristas
                        </label>
                        <div className="grid gap-2">
                            {colorists.map((colorist) => (
                                <div key={colorist.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`colorist-${colorist.id}`}
                                    />
                                    <label htmlFor={`colorist-${colorist.id}`} className="text-sm font-medium">
                                        {colorist.fullname}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="director" className="text-right">
                            Director (opcional)
                        </Label>
                        <Input id="director" name="director" className="col-span-3" placeholder="Nombre del director" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="producer" className="text-right">
                            Productora (opcional)
                        </Label>
                        <Input id="producer" name="producer" className="col-span-3" placeholder="Nombre de la productora" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="cinematographer" className="text-right">
                            Director de Fotografía (opcional)
                        </Label>
                        <Input id="cinematographer" name="cinematographer" className="col-span-3" placeholder="Nombre del DF" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="agency" className="text-right">
                            Agencia (opcional)
                        </Label>
                        <Input id="agency" name="agency" className="col-span-3" placeholder="Nombre de la agencia" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="videoLink" className="text-right">
                            Link del Video (opcional)
                        </Label>
                        <Input id="videoLink" name="videoLink" className="col-span-3" placeholder="https://video.com/watch?v=123" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="gallery" className="text-right">
                            Galería (URLs separadas por comas)
                        </Label>
                        <Input id="gallery" name="gallery" className="col-span-3" placeholder="https://img1.com, https://img2.com" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="synopsis" className="text-right">
                            Sinopsis (opcional)
                        </Label>
                        <Input id="synopsis" name="synopsis" className="col-span-3" placeholder="Breve descripción del proyecto" />
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descripción (opcional)
                        </Label>
                        <Input id="description" name="description" className="col-span-3" placeholder="Descripción detallada del proyecto" />
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Crear nuevo proyecto" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
