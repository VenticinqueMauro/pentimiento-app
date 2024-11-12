'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

interface Props {
    setPortadaFile: Dispatch<SetStateAction<File | null>>;
    initialImageUrl?: string | null;
}

export default function ImgPortada({ setPortadaFile, initialImageUrl = null }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);

    const handleFileChange = useCallback((file: File) => {
        if (file instanceof File && file.type.startsWith('image/')) {
            setPortadaFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            alert("Please select a valid image file (SVG, PNG, JPG).");
        }
    }, [setPortadaFile]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };


    // Clean up the preview URL on component unmount or when a new file is set
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl !== initialImageUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl, initialImageUrl]);

    return (
        <div className="flex flex-col items-start gap-4">
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-right">Portada</p>
            <div className="flex items-center justify-center max-w-full">
                <label
                    htmlFor="mainImageUrl"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 aspect-video border-gray-300 border-dashed rounded-lg p-2 cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-500 "
                >
                    {previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="max-w-full max-h-full object-contain rounded-lg me-auto"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                        </div>
                    )}
                    <input id="mainImageUrl" type="file" className="hidden" onChange={handleChange} />
                </label>
            </div>
        </div>
    );
}
