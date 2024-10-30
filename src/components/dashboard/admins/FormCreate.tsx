'use client';

import { handleRegister } from "@/actions/auth/register";
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

    const handleSubmit = async (formData: FormData) => {

        const result = await handleRegister(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Operación exitosa ✅' : 'Error al crear administrador 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive'
            });
            if (result?.message) {
                setOpen(false)
            }
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="mt-4" onClick={() => setOpen(true)}>Agregar admin</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear admin</SheetTitle>
                    <SheetDescription>
                        Ingresa su nombre y apellido para crear un nuevo admin
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <div className="relative w-full">
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                className="col-span-3 pr-36"
                                placeholder="ejemplo"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
                                @pentimiento.app
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="fullname" className="text-right">
                            Nombre completo
                        </Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            className="col-span-3"
                            placeholder="Juan Lopez" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="password" className="text-right">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            className="col-span-3"
                            placeholder="******" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="confirmPassword" className="text-right">
                            Confirmar contraseña
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="col-span-3"
                            placeholder="******" />
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Crear nuevo administrador" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
