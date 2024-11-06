'use client';

import { ProjectWithRelations } from "@/actions/project/getProjects";
import { handleUpdateProject } from "@/actions/project/update";
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
import { useState } from "react";
import ColoristsCheckbox from "./ColoristsCheckbox";
import GalleryUploader from "./ImgGallery";
import ImgPortada from "./ImgPortada";
import SelectTypeAndSubtype from "./SelectTypeAndSubtype";
import { EditIcon } from "lucide-react";
import ImgThumbnail from "./ImgThumbnail";

interface FormEditProps {
    project: ProjectWithRelations;
    onEdit?: () => void;
}

export function FormEdit({ project, onEdit }: FormEditProps) {
    const [open, setOpen] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [portadaFile, setPortadaFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [typeId, setTypeId] = useState<string | null>(project.typeId ? project.typeId.toString() : null);
    const [subtypeId, setSubtypeId] = useState<string | null>(project.subtypeId ? project.subtypeId.toString() : null);
    const [selectedColorists, setSelectedColorists] = useState<number[]>(project.colorists.map(c => c.id));

    const handleSubmit = async (formData: FormData) => {
        if (thumbnailFile) formData.append('thumbnailUrl', thumbnailFile);
        if (portadaFile) formData.append('mainImageUrl', portadaFile);
        if (typeId) formData.append('typeId', typeId);
        if (subtypeId) formData.append('subtypeId', subtypeId);
        if (galleryFiles.length > 0) {
            galleryFiles.forEach((file) => formData.append("galleryFiles", file));
        }
        if (selectedColorists.length > 0) {
            formData.append('colorists', JSON.stringify(selectedColorists));
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
            <SheetContent className="max-w-xl mx-auto h-full overflow-y-auto lg:px-16 rounded" side='bottom'>
                <SheetHeader>
                    <SheetTitle>Editar proyecto</SheetTitle>
                    <SheetDescription>
                        Modifique los datos necesarios para actualizar el proyecto
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="flex flex-col gap-4 py-4">
                    {/* Input Title */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={project.title || ""}
                            placeholder="Título del proyecto"
                        />
                    </div>
                    <ImgThumbnail setThumbnailFile={setThumbnailFile} initialImageUrl={project.thumbnailUrl} />
                    {/* Input Portada */}
                    <ImgPortada setPortadaFile={setPortadaFile} initialImageUrl={project.mainImageUrl} />
                    {/* Select Type and Subtype */}
                    <SelectTypeAndSubtype
                        setTypeId={setTypeId}
                        setSubtypeId={setSubtypeId}
                        initialTypeId={typeId}
                        initialSubtypeId={subtypeId}
                    />
                    {/* Colorists Checkbox */}
                    <ColoristsCheckbox setSelectedColorists={setSelectedColorists} initialColorists={selectedColorists} />
                    {/* Input Director */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="director">Director (opcional)</Label>
                        <Input
                            id="director"
                            name="director"
                            defaultValue={project.director || ""}
                            placeholder="Nombre del director"
                        />
                    </div>
                    {/* Input Producer */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="producer">Productora (opcional)</Label>
                        <Input
                            id="producer"
                            name="producer"
                            defaultValue={project.producer || ""}
                            placeholder="Nombre de la productora"
                        />
                    </div>
                    {/* Input Cinematographer */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="df">Director de Fotografía (opcional)</Label>
                        <Input
                            id="df"
                            name="df"
                            defaultValue={project.df || ""}
                            placeholder="Nombre del DF"
                        />
                    </div>
                    {/* Input Agency */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="agency">Agencia (opcional)</Label>
                        <Input
                            id="agency"
                            name="agency"
                            defaultValue={project.agency || ""}
                            placeholder="Nombre de la agencia"
                        />
                    </div>
                    {/* Input Video Link */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="videoLink">Link del Video (opcional)</Label>
                        <Input
                            id="videoLink"
                            name="videoLink"
                            defaultValue={project.videoLink || ""}
                            placeholder="https://video.com/watch?v=123"
                        />
                    </div>
                    {/* Input Gallery */}
                    <GalleryUploader
                        setGalleryFiles={setGalleryFiles}
                        initialGalleryUrls={project?.gallery.map((item) => ({ url: item.url, publicId: item.publicId || "" })) || []}
                    />

                    {/* Input Synopsis */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="synopsis">Sinopsis (opcional)</Label>
                        <Input
                            id="synopsis"
                            name="synopsis"
                            defaultValue={project.synopsis || ""}
                            placeholder="Breve descripción del proyecto"
                        />
                    </div>
                    {/* Input Description */}
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="description">Descripción (opcional)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={project.description || ""}
                            placeholder="Descripción detallada del proyecto"
                        />
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Guardar cambios" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
