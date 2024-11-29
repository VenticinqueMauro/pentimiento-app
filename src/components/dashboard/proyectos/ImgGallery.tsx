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
import { Dispatch, SetStateAction, useState } from "react";

export interface GalleryImage {
    url: string;
    publicId: string;
}

interface Props {
    setGalleryUrls: Dispatch<SetStateAction<GalleryImage[]>>;
    setIsUploading: Dispatch<SetStateAction<boolean>>;
    initialGalleryUrls?: GalleryImage[];
}

export default function GalleryUploader({ setGalleryUrls, setIsUploading, initialGalleryUrls = [] }: Props) {
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryUrls);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFilesChange = async (files: FileList) => {
        const validFiles = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );

        if (validFiles.length > 0) {
            setUploading(true);
            setIsUploading(true);

            try {
                // Subir imágenes a Cloudinary y obtener las URLs y publicIds
                const uploadedImages = await Promise.all(
                    validFiles.map(async (file) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET || "");
                        formData.append("folder", "projects/gallery");
                        const response = await fetch(
                            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                            {
                                method: "POST",
                                body: formData,
                            }
                        );

                        const data = await response.json();

                        if (data.secure_url && data.public_id) {
                            return { url: data.secure_url, publicId: data.public_id };
                        } else {
                            throw new Error(`Error al subir la imagen ${file.name}`);
                        }
                    })
                );

                // Actualizar el estado con las nuevas imágenes
                setGalleryImages((prevImages) => [...prevImages, ...uploadedImages]);

                // Proveer al componente padre la lista actualizada de imágenes
                setGalleryUrls((prevUrls) => [...prevUrls, ...uploadedImages]);

            } catch (error) {
                console.error("Error al subir las imágenes:", error);
                toast({
                    title: "Error al subir las imágenes",
                    description: "Ocurrió un error al subir las imágenes. Por favor, inténtalo de nuevo.",
                    variant: "destructive",
                });
            } finally {
                setUploading(false);
                setIsUploading(false);
            }
        } else {
            toast({
                title: "Archivos no válidos",
                description: "Por favor selecciona archivos de imagen válidos (SVG, PNG, JPG).",
                variant: "destructive",
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            handleFilesChange(files);
        }
    };

    const handleDelete = async (publicId: string) => {
        const isExistingImage = initialGalleryUrls.some(image => image.publicId === publicId);

        if (isExistingImage) {
            // Imagen existente: eliminar de Cloudinary y base de datos
            const result = await handleDeleteImageFromCloudinaryAndDB(publicId);
            if (result.error) {
                toast({
                    title: 'Error al eliminar la imagen',
                    description: result.error,
                    variant: 'default',
                });
            } else {
                // Actualizar el estado local
                setGalleryImages(prevImages => prevImages.filter(image => image.publicId !== publicId));
                // Actualizar en el componente padre
                setGalleryUrls(prevUrls => prevUrls.filter(image => image.publicId !== publicId));
                toast({
                    title: 'Imagen eliminada correctamente',
                    description: 'La imagen se ha eliminado correctamente de la galería',
                    variant: 'default',
                });
            }
        } else {
            // Imagen nueva: eliminar de Cloudinary
            try {
                const response = await fetch('/api/deleteImage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ publicId }),
                });
                const data = await response.json();

                if (data.success) {
                    // Actualizar el estado local
                    setGalleryImages(prevImages => prevImages.filter(image => image.publicId !== publicId));
                    // Actualizar en el componente padre
                    setGalleryUrls(prevUrls => prevUrls.filter(image => image.publicId !== publicId));
                    toast({
                        title: 'Imagen eliminada correctamente',
                        description: 'La imagen se ha eliminado correctamente de la galería',
                        variant: 'default',
                    });
                } else {
                    throw new Error(data.error || 'Error al eliminar la imagen');
                }
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
                toast({
                    title: 'Error al eliminar la imagen',
                    description: 'Ocurrió un error al eliminar la imagen. Por favor, inténtalo de nuevo.',
                    variant: 'destructive',
                });
            }
        }
    };

    return (
        <div className="flex flex-col items-start gap-4 px-6 lg:px-0">
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-start">Galería</p>
            <label
                htmlFor="galleryFiles"
                className="flex flex-col items-center justify-center w-full h-64 border-2 aspect-video border-gray-300 border-dashed rounded-lg p-2 cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-500 "
            >
                <input
                    id="galleryFiles"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleChange}
                    accept="image/*"
                />
                {galleryImages.length === 0 ? (
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
                            <span className="font-semibold">Haz clic para subir</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Puedes seleccionar múltiples imágenes
                        </p>
                    </div>
                ) : (
                    <Carousel opts={{ align: "start" }} className="w-full ">
                        <CarouselContent>
                            {galleryImages.map((image, index) => (
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
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="destructive"
                                                    className="absolute top-2 right-2 cursor-pointer"
                                                    onClick={() => handleDelete(image.publicId)}
                                                >
                                                    <TrashIcon />
                                                </Button>
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
            {uploading && <p className="text-sm text-gray-500">Subiendo imágenes...</p>}
        </div>
    );
}
