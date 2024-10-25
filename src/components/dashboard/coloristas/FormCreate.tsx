'use client';
import { handleCreateColorist } from "@/actions/colorist/create";
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
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function FormCreate() {

    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const result = await handleCreateColorist(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Colorista creado 😃!' : 'Error 😮‍💨';

        if (message) {
            toast({
                title,
                description: message,
            });
            if (result?.message) setOpen(false); // Cierra el modal si la creación fue exitosa
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="mt-4" onClick={() => setOpen(true)}>Agregar colorista</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear colorista</SheetTitle>
                    <SheetDescription>
                        Ingresa su nombre y apellido para crear un nuevo colorista
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="fullname" className="text-right">
                            Nombre completo
                        </Label>
                        <Input id="fullname" name="fullname" className="col-span-3" placeholder="Juan Lopez" />
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Guardar cambios</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
