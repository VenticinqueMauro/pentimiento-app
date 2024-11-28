'use client';

import { handleCreateProject } from "@/actions/project/create";
import { SubmitButton } from "@/components/auth/submitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import ColoristsCheckbox from "./ColoristsCheckbox";
import ImgGallery from "./ImgGallery";
import ImgPortada from "./ImgPortada";
import SelectTypeAndSubtype from "./SelectTypeAndSubtype";
import ImgThumbnail from "./ImgThumbnail";

interface FormCreateProps {
    onCreate: () => void;
}

const MAX_TOTAL_SIZE_MB = 4.5;

export function FormCreate({ onCreate }: FormCreateProps) {
    const [open, setOpen] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [portadaFile, setPortadaFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [typeId, setTypeId] = useState<string | null>(null);
    const [subtypeIds, setSubtypeIds] = useState<string[]>([]);
    const [selectedColorists, setSelectedColorists] = useState<number[]>([]);
    const [totalSize, setTotalSize] = useState<number>(0); // Seguimiento del peso total
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false); // Deshabilitación del botón

    // Calcular el tamaño total dinámicamente
    useEffect(() => {
        const thumbnailSize = thumbnailFile?.size || 0;
        const portadaSize = portadaFile?.size || 0;
        const gallerySize = galleryFiles.reduce((acc, file) => acc + file.size, 0);
        const calculatedTotalSize = thumbnailSize + portadaSize + gallerySize;

        setTotalSize(calculatedTotalSize);
        setIsSubmitDisabled(calculatedTotalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024); // Deshabilitar si excede el límite
    }, [thumbnailFile, portadaFile, galleryFiles]);

    const handleSubmit = async (formData: FormData) => {
        if (isSubmitDisabled) {
            toast({
                title: "Error en la carga",
                description: `El tamaño total de las imágenes seleccionadas (${(
                    totalSize /
                    (1024 * 1024)
                ).toFixed(2)} MB) excede el límite permitido de ${MAX_TOTAL_SIZE_MB} MB.`,
                variant: "destructive",
            });
            return;
        }

        formData.append('thumbnailUrl', thumbnailFile as File);
        formData.append('mainImageUrl', portadaFile as File);
        if (typeId) formData.append('typeId', typeId);
        if (subtypeIds.length > 0) {
            formData.append('subtypeIds', JSON.stringify(subtypeIds));
        }
        if (galleryFiles.length > 0) {
            galleryFiles.forEach((file) => formData.append("galleryFiles", file));
        }
        if (selectedColorists.length > 0) {
            formData.append('colorists', JSON.stringify(selectedColorists));
        }

        try {
            const result = await handleCreateProject(formData);

            const message = result?.message ?? result?.error;
            const title = result?.message ? 'Proyecto creado 😃!' : 'Error al crear proyecto 😢';

            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });

            if (result?.message && onCreate) {
                onCreate();
            }
        } catch (error) {
            console.error("Error en la creación del proyecto:", error);
            toast({
                title: "Error al crear proyecto 😢",
                description: "Ocurrió un problema al crear el proyecto. Inténtalo de nuevo.",
                variant: "destructive",
            });
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="mt-4" onClick={() => setOpen(true)}>Agregar proyecto</Button>
            </SheetTrigger>
            <SheetContent className="max-w-xl mx-auto h-full overflow-y-auto lg:px-16 rounded" side='bottom'>
                <SheetHeader>
                    <SheetTitle>Crear proyecto</SheetTitle>
                    <SheetDescription>
                        Ingresa los datos necesarios para crear un nuevo proyecto
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" name="title" placeholder="Título del proyecto" required />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="uniqueCode">Código único</Label>
                        <Input id="uniqueCode" name="uniqueCode" placeholder="Año-Mes-Título" required />
                    </div>
                    <ImgThumbnail setThumbnailFile={setThumbnailFile} />
                    <ImgPortada setPortadaFile={setPortadaFile} />
                    <SelectTypeAndSubtype setTypeId={setTypeId} setSubtypeIds={setSubtypeIds} />
                    <ColoristsCheckbox setSelectedColorists={setSelectedColorists} />
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="director">Director (opcional)</Label>
                        <Input id="director" name="director" placeholder="Nombre del director" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="producer">Productora (opcional)</Label>
                        <Input id="producer" name="producer" placeholder="Nombre de la productora" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="df">Director de Fotografía (opcional)</Label>
                        <Input id="df" name="df" placeholder="Nombre del DF" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="agency">Agencia (opcional)</Label>
                        <Input id="agency" name="agency" placeholder="Nombre de la agencia" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="videoLink">Link del Video (opcional)</Label>
                        <Input id="videoLink" name="videoLink" placeholder="https://video.com/watch?v=123" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="imdbUrl">Link de IMDB (opcional)</Label>
                        <Input id="imdbUrl" name="imdbUrl" placeholder="https://imdb.com/title/tt123456789" />
                    </div>
                    <ImgGallery setGalleryFiles={setGalleryFiles} />
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="synopsis">Sinopsis (opcional)</Label>
                        <Input id="synopsis" name="synopsis" placeholder="Breve descripción del proyecto" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="description">Descripción (opcional)</Label>
                        <Textarea id="description" name="description" placeholder="Descripción detallada del proyecto" />
                    </div>
                    <p className="text-sm">
                        Tamaño total:{" "}
                        <span
                            className={`font-medium ${totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                        >
                            {(totalSize / (1024 * 1024)).toFixed(2)} MB
                        </span>{" "}
                        / {MAX_TOTAL_SIZE_MB} MB
                    </p>
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Crear nuevo proyecto" isSubmitDisabled={isSubmitDisabled} />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
