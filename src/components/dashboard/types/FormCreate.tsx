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
    const [subtypeList, setSubtypeList] = useState([{ name: '' }]); // Inicializa con un subtipo vacío

    const handleSubmit = async (formData: FormData) => {
        const typeName = formData.get('typeName') as string;

        // Validación del nombre del tipo
        if (!typeName) {
            toast({
                title: 'Error al crear tipo',
                description: 'El campo nombre del tipo es obligatorio',
                variant: 'destructive',
            });
            return;
        }

        // Agregar cada subtipo al formData
        subtypeList.forEach((subtype, index) => {
            formData.append(`subtypes[${index}][name]`, subtype.name);
        });

        const result = await handleCreateTypeAndSubtype(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Operación exitosa ✅' : 'Error al crear tipo o subtipos 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
            if (result?.message) {
                setOpen(false);
                setSubtypeList([{ name: '' }]); // Reinicia la lista de subtipos al cerrar
                setHasSubtype(false);
            }
        }
    };

    const handleSubtypeChange = (index: number, name: string) => {
        setSubtypeList((prev) => {
            const updated = [...prev];
            updated[index].name = name;
            return updated;
        });
    };

    const addSubtype = () => {
        setSubtypeList((prev) => [...prev, { name: '' }]);
    };

    const removeSubtype = (index: number) => {
        setSubtypeList((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="mt-4" onClick={() => setOpen(true)}>
                    Agregar Tipo/Subtipos
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear Tipo y Subtipos</SheetTitle>
                    <SheetDescription>
                        Ingresa el nombre del tipo y, si deseas, añade uno o varios subtipos asociados.
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="typeName" className="text-right">
                            Nombre del Tipo
                        </Label>
                        <Input
                            id="typeName"
                            name="typeName"
                            className="col-span-3"
                            placeholder="Ejemplo de Tipo"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="hasSubtype"
                            checked={hasSubtype}
                            onChange={() => setHasSubtype(!hasSubtype)}
                        />
                        <Label htmlFor="hasSubtype">¿Desea añadir subtipos?</Label>
                    </div>
                    {hasSubtype && (
                        <div className="flex flex-col gap-2 mt-4">
                            <Label>Subtipos</Label>
                            {subtypeList.map((subtype, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        name={`subtypeName-${index}`}
                                        value={subtype.name}
                                        onChange={(e) => handleSubtypeChange(index, e.target.value)}
                                        className="flex-1"
                                        placeholder="Ejemplo de Subtipo"
                                        required
                                    />
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        type="button"
                                        onClick={() => removeSubtype(index)}
                                    >
                                        ❌
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addSubtype}>
                                Añadir Subtipo
                            </Button>
                        </div>
                    )}
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Crear Tipo/Subtipos" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
