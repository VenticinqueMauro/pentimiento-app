'use client';

import { handleEditTypeOrSubtype } from "@/actions/typeAndSubtype/update";
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
import { EditIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    typeId: number;
    typeName: string;
    subtypes: { id?: number; name: string }[]; // Lista de subtipos iniciales
}

export function FormEditTypeAndSubtype({ typeId, typeName, subtypes }: Props) {
    const [open, setOpen] = useState(false);
    const [subtypeList, setSubtypeList] = useState(subtypes);

    const handleSubmit = async (formData: FormData) => {
        formData.append('typeId', typeId.toString());
        formData.append('typeName', formData.get('typeName') as string);

        subtypeList.forEach((subtype, index) => {
            // Reemplazar espacios por guiones en el nombre del subtipo antes de enviarlo
            const formattedName = subtype.name.trim().replace(/\s+/g, '-').toLowerCase();
            formData.append(`subtypes[${index}][id]`, subtype.id?.toString() ?? '');
            formData.append(`subtypes[${index}][name]`, formattedName);
        });

        const result = await handleEditTypeOrSubtype(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Operación exitosa ✅' : 'Error al actualizar tipo o subtipos 😢';

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
                <Button size={'icon'} variant="outline" className="rounded" onClick={() => setOpen(true)}>
                    <EditIcon className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar Tipo y Subtipos</SheetTitle>
                    <SheetDescription>
                        Modifica el nombre del tipo y los subtipos asociados.
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
                            defaultValue={typeName}
                            className="col-span-3"
                            placeholder="Ejemplo de Tipo"
                        />
                    </div>

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
                                />
                                <Button size="icon" variant="outline" onClick={() => removeSubtype(index)}>
                                    ❌
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addSubtype}>Añadir Subtipo</Button>
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Editar Tipo y Subtipos" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
