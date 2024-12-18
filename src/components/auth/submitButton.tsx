'use client';

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface Props{
    title: string;
    isSubmitDisabled?: boolean;
}


export const SubmitButton = ({
    title,
    isSubmitDisabled = false,
}: Props) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-medium text-white ${isSubmitDisabled || pending
                    ? "bg-gray-400 cursor-not-allowed"
                    : ""
                } ${pending && "opacity-80"}`}
            disabled={isSubmitDisabled || pending}
        >
            {pending ? (
                <div className="flex justify-center items-center w-full">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                </div>
            ) : isSubmitDisabled ? (
                "Subiendo imagenes, por favor espere..."
            ) : (
                title
            )}
        </Button>
    );
};

