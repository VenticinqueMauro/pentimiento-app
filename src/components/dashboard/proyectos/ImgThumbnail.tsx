'use client';

import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    setThumbnailUrl: Dispatch<SetStateAction<string | null>>;
    setThumbnailId: Dispatch<SetStateAction<string | null>>;
    setIsUploading: Dispatch<SetStateAction<boolean>>;
    initialImageUrl?: string | null;
}

export default function ImgThumbnail({ setThumbnailUrl, setThumbnailId, setIsUploading, initialImageUrl = null }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        if (!file.type.startsWith('image/')) {
            alert("Por favor, selecciona un archivo de imagen válido (SVG, PNG, JPG).");
            return;
        }



        setUploading(true);

        // Mostrar vista previa localmente
        setPreviewUrl(URL.createObjectURL(file));

        // Subir imagen a Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET || "");
        formData.append("folder", "projects/thumbnail"); // Opcional: especifica la carpeta en Cloudinary

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();

            if (data.secure_url && data.public_id) {
                setThumbnailUrl(data.secure_url);
                setThumbnailId(data.public_id);
            } else {
                console.error("Error al subir la imagen a Cloudinary:", data);
                alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
        } finally {
            setUploading(false);
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-4">
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right">Thumbnail</p>
            <div className="flex items-center justify-center max-w-full">
                <label
                    htmlFor="thumbnailUrl"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg p-2 cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-500"
                >
                    {previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="max-w-full max-h-full object-contain rounded-lg"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Haz clic para subir</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                        </div>
                    )}
                    <input id="thumbnailUrl" type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
            {uploading && <p className="text-sm text-gray-500">Subiendo imagen...</p>}
        </div>
    );
}
