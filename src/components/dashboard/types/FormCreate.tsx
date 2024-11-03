'use client';

import { handleCreateTypeAndSubtype } from "@/actions/typeAndSubtype/create";
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
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function FormCreate() {
    const [open, setOpen] = useState(false);
    const [hasSubtype, setHasSubtype] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const result = await handleCreateTypeAndSubtype(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Operación exitosa ✅' : 'Error al crear tipo o subtipo 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
            if (result?.message) {
                setOpen(false);
            }
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="mt-4" onClick={() => setOpen(true)}>Agregar Tipo/Subtipo</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear Tipo y Subtipo</SheetTitle>
                    <SheetDescription>
                        Ingresa el nombre del tipo y, si deseas, un subtipo asociado.
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="typeName" className="text-right">
                            Nombre del Tipo
                        </Label>
                        <Input id="typeName" name="typeName" className="col-span-3" placeholder="Ejemplo de Tipo" />
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="hasSubtype"
                            checked={hasSubtype}
                            onChange={() => setHasSubtype(!hasSubtype)}
                        />
                        <Label htmlFor="hasSubtype">¿Desea añadir un subtipo?</Label>
                    </div>
                    {hasSubtype && (
                        <div className="flex flex-col items-start gap-4 mt-4">
                            <Label htmlFor="subtypeName" className="text-right">
                                Nombre del Subtipo
                            </Label>
                            <Input id="subtypeName" name="subtypeName" className="col-span-3" placeholder="Ejemplo de Subtipo" />
                        </div>
                    )}
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Crear Tipo/Subtipo" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
