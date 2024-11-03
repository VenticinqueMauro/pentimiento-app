'use client';

import { handleDeleteProject } from "@/actions/project/delete";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    title: string;
    projectId: number;
    onDelete?: () => void;
}

export function AlertProjectDelete({ title, projectId, onDelete }: Props) {
    const [confirmationText, setConfirmationText] = useState("");
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

    const confirmationPhrase = "ELIMINAR";

    async function handleDelete() {
        const result = await handleDeleteProject(projectId);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Proyecto eliminado ✅' : 'Error al eliminar proyecto 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
        }

        if (result?.message && onDelete) {
            onDelete();
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmationText(value);
        setIsConfirmDisabled(value !== confirmationPhrase);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive" className="rounded" aria-label="Eliminar proyecto">
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-center w-fit">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de que deseas eliminar el proyecto <b className="capitalize">{title}</b>?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción es permanente y no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Escribe &quot;<b>{confirmationPhrase}</b>&quot; para confirmar:</p>
                    <Input
                        type="text"
                        value={confirmationText}
                        onChange={handleInputChange}
                        placeholder={confirmationPhrase}
                        className="text-center"
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={handleDelete}
                        disabled={isConfirmDisabled}
                    >
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
