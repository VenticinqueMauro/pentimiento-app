'use client';

import { handleCreateProject } from "@/actions/project/create";
import { SubmitButton } from "@/components/auth/submitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import ColoristsCheckbox from "./ColoristsCheckbox";
import ImgGallery, { GalleryImage } from "./ImgGallery";
import ImgPortada from "./ImgPortada";
import ImgThumbnail from "./ImgThumbnail";
import SelectTypeAndSubtype from "./SelectTypeAndSubtype";

interface FormCreateProps {
    onCreate: () => void;
}


export function FormCreate({ onCreate }: FormCreateProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [thumbnailId, setThumbnailId] = useState<string | null>(null);

    const [portadaUrl, setPortadaUrl] = useState<string | null>(null);
    const [portadaId, setPortadaId] = useState<string | null>(null);

    const [galleryUrls, setGalleryUrls] = useState<GalleryImage[]>([]);
    const [typeId, setTypeId] = useState<string | null>(null);
    const [subtypeIds, setSubtypeIds] = useState<string[]>([]);
    const [selectedColorists, setSelectedColorists] = useState<number[]>([]);


    const handleSubmit = async (formData: FormData) => {
        if (!thumbnailUrl || !portadaUrl || !thumbnailId || !portadaId) {
            toast({
                title: "Error en la carga",
                description: "Por favor, sube las imágenes requeridas.",
                variant: "destructive",
            });
            return;
        }

        formData.append('thumbnailUrl', thumbnailUrl);
        formData.append('thumbnailId', thumbnailId);
        formData.append('mainImageUrl', portadaUrl);
        formData.append('mainImageId', portadaId);

        if (typeId) formData.append('typeId', typeId);
        if (subtypeIds.length > 0) {
            formData.append('subtypeIds', JSON.stringify(subtypeIds));
        }
        if (selectedColorists.length > 0) {
            formData.append('colorists', JSON.stringify(selectedColorists));
        }
        if (galleryUrls.length > 0) {
            formData.append('galleryUrls', JSON.stringify(galleryUrls));
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
            <SheetContent
                className="max-w-xl mx-auto h-full overflow-y-auto lg:px-16 rounded" side='bottom'
                onInteractOutside={(event) => event.preventDefault()}
                onEscapeKeyDown={(event) => event.preventDefault()}
            >
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

                    <ImgThumbnail
                        setThumbnailUrl={setThumbnailUrl}
                        setThumbnailId={setThumbnailId}
                        setIsUploading={setIsUploading}
                    />

                    <ImgPortada
                        setPortadaUrl={setPortadaUrl}
                        setPortadaId={setPortadaId}
                        setIsUploading={setIsUploading}
                    />

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
                    <ImgGallery
                        setGalleryUrls={setGalleryUrls}
                        setIsUploading={setIsUploading}
                    />
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="synopsis">Sinopsis (opcional)</Label>
                        <Input id="synopsis" name="synopsis" placeholder="Breve descripción del proyecto" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="description">Descripción (opcional)</Label>
                        <Textarea id="description" name="description" placeholder="Descripción detallada del proyecto" />
                    </div>
                    <SheetFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                            type="button"
                        >
                            Cerrar
                        </Button>
                        <SubmitButton title="Guardar cambios" isSubmitDisabled={isUploading} />
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
