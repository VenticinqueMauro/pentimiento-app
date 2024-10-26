'use client';
import { handleDeleteColorist } from "@/actions/colorist/delete";
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
import { toast } from "@/hooks/use-toast";
import { UserRoundXIcon } from "lucide-react";

interface Props {
    fullname: string;
    id: number;
}

export function AlertColoristDelete({ fullname, id }: Props) {

    async function handleDelete() {
        const result = await handleDeleteColorist(id);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Operación exitosa ✅' : 'Error al eliminar colorista 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive" className="rounded" aria-label="Eliminar colorista">
                    <UserRoundXIcon className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-center w-fit">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de que deseas eliminar a <b className="capitalize">{fullname}</b>?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción es permanente y no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={handleDelete}
                    >
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
