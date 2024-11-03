/* eslint-disable @next/next/no-img-element */
'use client';

import { handleDeleteImageFromCloudinaryAndDB } from "@/actions/project/uploadImgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface GalleryImage {
    url: string;
    publicId: string;
}

interface Props {
    setGalleryFiles: Dispatch<SetStateAction<File[]>>;
    initialGalleryUrls?: GalleryImage[]; // Ahora incluye el publicId de cada imagen
}

export default function GalleryUploader({ setGalleryFiles, initialGalleryUrls = [] }: Props) {
    const [newBlobUrls, setNewBlobUrls] = useState<string[]>([]);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryUrls);

    const handleFilesChange = (files: FileList) => {
        const validFiles = Array.from(files).filter(file => file.type.startsWith("image/"));

        if (validFiles.length > 0) {
            setGalleryFiles(validFiles);

            // Revocar URLs previas de blobs
            newBlobUrls.forEach(url => {
                URL.revokeObjectURL(url);
            });

            // Generar nuevas URLs de blob
            const newUrls = validFiles.map(file => URL.createObjectURL(file));
            setNewBlobUrls(newUrls);
        } else {
            alert("Por favor selecciona archivos de imagen válidos (SVG, PNG, JPG).");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            handleFilesChange(files);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files) {
            handleFilesChange(files);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    // Limpiar URLs de blobs al desmontar el componente para evitar fugas de memoria
    useEffect(() => {
        return () => {
            newBlobUrls.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [newBlobUrls]);

    const handleDelete = async (publicId: string) => {
        const result = await handleDeleteImageFromCloudinaryAndDB(publicId);
        if (result.error) {
            toast({
                title: 'Error al eliminar la imagen',
                description: result.error,
                variant: 'default',
            });
        } else {
            // Eliminar la imagen del estado local `galleryImages`
            setGalleryImages(prevImages => prevImages.filter(image => image.publicId !== publicId));
            toast({
                title: 'Imagen eliminada correctamente',
                description: 'La imagen se ha eliminado correctamente de la galería',
                variant: 'default',
            });
        }
    };

    // Combinar las URLs iniciales con las nuevas URLs de blobs
    const allPreviewUrls = [
        ...galleryImages,
        ...newBlobUrls.map(url => ({ url, publicId: '' }))
    ];

    return (
        <div className="flex flex-col items-center gap-4 px-6 lg:px-0">
            <label
                htmlFor="galleryFiles"
                className="flex flex-col items-center justify-center w-full h-64 border-2 aspect-video border-gray-300 border-dashed rounded-lg p-2 cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-500 "
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    id="galleryFiles"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleChange}
                    accept="image/*"
                />
                {allPreviewUrls.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG (múltiples)
                        </p>
                    </div>
                ) : (
                    <Carousel opts={{ align: "start" }} className="w-full ">
                        <CarouselContent>
                            {allPreviewUrls.map((image, index) => (
                                <CarouselItem
                                    key={image.publicId || index}
                                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg"
                                >
                                    <div className="p-2">
                                        <Card>
                                            <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                                                <img
                                                    src={image.url}
                                                    alt={`Vista previa ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg me-auto"
                                                />
                                                {image.publicId && (
                                                    <Button
                                                        type="button"
                                                        size="icon"
                                                        variant="destructive"
                                                        className="absolute top-2 right-2 cursor-pointer"
                                                        onClick={() => handleDelete(image.publicId)}
                                                    >
                                                        <TrashIcon />
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious type="button" />
                        <CarouselNext type="button" />
                    </Carousel>
                )}
            </label>
        </div>
    );
}
