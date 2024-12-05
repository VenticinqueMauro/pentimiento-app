'use client';

import { ProjectWithRelations } from "@/actions/project/getProjects";
import { handleUpdateProject } from "@/actions/project/update";
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
import { toast } from "@/hooks/use-toast";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import ColoristsCheckbox from "./ColoristsCheckbox";
import GalleryUploader, { GalleryImage } from "./ImgGallery";
import ImgPortada from "./ImgPortada";
import ImgThumbnail from "./ImgThumbnail";
import SelectTypeAndSubtype from "./SelectTypeAndSubtype";
import { Textarea } from "@/components/ui/textarea";

interface FormEditProps {
    project: ProjectWithRelations;
    onEdit?: () => void;
}

export function FormEdit({ project, onEdit }: FormEditProps) {
    const [open, setOpen] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(project.thumbnailUrl);
    const [thumbnailId, setThumbnailId] = useState<string | null>(project.thumbnailId);

    const [portadaUrl, setPortadaUrl] = useState<string | null>(project.mainImageUrl);
    const [portadaId, setPortadaId] = useState<string | null>(project.mainImageId);

    const [galleryUrls, setGalleryUrls] = useState<GalleryImage[]>(
        project?.gallery.map((item) => ({ url: item.url, publicId: item.publicId || "" })) || []
    );

    const [typeId, setTypeId] = useState<string | null>(project.typeId ? project.typeId.toString() : null);
    const [subtypeIds, setSubtypeIds] = useState<string[]>(
        project.subtypes.map(subtype => subtype.id.toString())
    );
    const [selectedColorists, setSelectedColorists] = useState<number[]>(project.colorists.map(c => c.id));

    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        if (!thumbnailUrl || !portadaUrl || !thumbnailId || !portadaId) {
            toast({
                title: "Error en la carga",
                description: "Por favor, sube las imágenes requeridas.",
                variant: "destructive",
            });
            return;
        }

        if (isUploading) {
            toast({
                title: "Imágenes subiendo",
                description: "Por favor, espera a que las imágenes terminen de subir.",
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

        const result = await handleUpdateProject(project.id, formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Proyecto actualizado 😃!' : 'Error al actualizar proyecto 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
        }

        if (result?.message && onEdit) {
            onEdit();
            setOpen(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size={'icon'} variant="outline" onClick={() => setOpen(true)}>
                    <span><EditIcon className="w-4 h-4" /></span>
                </Button>
            </SheetTrigger>
            <SheetContent
                className="max-w-xl mx-auto h-full overflow-y-auto lg:px-16 rounded"
                side='bottom'
                onInteractOutside={(event) => event.preventDefault()}
                onEscapeKeyDown={(event) => event.preventDefault()}
            >
                <SheetHeader>
                    <SheetTitle>Editar proyecto</SheetTitle>
                    <SheetDescription>
                        Modifique los datos necesarios para actualizar el proyecto
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="flex flex-col gap-4 py-4">
                    {isUploading && (
                        <div className="flex items-center text-blue-500">
                            <span>Subiendo imágenes, por favor espera...</span>
                        </div>
                    )}
                    {/* Campos del formulario */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={project.title || ""}
                            placeholder="Título del proyecto"
                            required
                            disabled={isUploading}
                        />
                    </div>
                    <ImgThumbnail
                        setThumbnailUrl={setThumbnailUrl}
                        setThumbnailId={setThumbnailId}
                        setIsUploading={setIsUploading}
                        initialImageUrl={thumbnailUrl}
                    />

                    <ImgPortada
                        setPortadaUrl={setPortadaUrl}
                        setPortadaId={setPortadaId}
                        setIsUploading={setIsUploading}
                        initialImageUrl={portadaUrl}
                    />

                    <SelectTypeAndSubtype
                        setTypeId={setTypeId}
                        setSubtypeIds={setSubtypeIds}
                        initialTypeId={typeId}
                        initialSubtypeIds={subtypeIds}
                    />

                    <ColoristsCheckbox
                        setSelectedColorists={setSelectedColorists}
                        initialColorists={selectedColorists}
                    />
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="director">Director (opcional)</Label>
                        <Input id="director" name="director" placeholder="Nombre del director" defaultValue={project.director || ''} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="producer">Productora (opcional)</Label>
                        <Input id="producer" name="producer" placeholder="Nombre de la productora" defaultValue={project.producer || ''} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="df">Director de Fotografía (opcional)</Label>
                        <Input id="df" name="df" placeholder="Nombre del DF" defaultValue={project.df || ''} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="agency">Agencia (opcional)</Label>
                        <Input id="agency" name="agency" placeholder="Nombre de la agencia" defaultValue={project.agency || ''} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="videoLink">Link del Video (opcional)</Label>
                        <Input id="videoLink" name="videoLink" placeholder="https://video.com/watch?v=123" defaultValue={project.videoLink || ''} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="imdbUrl">Link de IMDB (opcional)</Label>
                        <Input id="imdbUrl" name="imdbUrl" placeholder="https://imdb.com/title/tt123456789" defaultValue={project.imdbUrl || ''} />
                    </div>
                    <GalleryUploader
                        setGalleryUrls={setGalleryUrls}
                        setIsUploading={setIsUploading}
                        initialGalleryUrls={galleryUrls}
                    />
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="synopsis">Sinopsis (opcional)</Label>
                        <Input id="synopsis" name="synopsis" placeholder="Breve descripción del proyecto" defaultValue={project.synopsis || ''} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="description">Descripción (opcional)</Label>
                        <Textarea id="description" name="description" placeholder="Descripción detallada del proyecto" defaultValue={project.description || ''} />
                    </div>
                    <SheetFooter>
                        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
                            Cerrar
                        </Button>
                        <SubmitButton title="Guardar cambios" isSubmitDisabled={isUploading} />
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
