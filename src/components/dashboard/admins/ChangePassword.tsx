'use client';

import { handlePasswordUpdate } from "@/actions/auth/updatePassword";
import { SubmitButton } from "@/components/auth/submitButton";
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

export function FormChangePassword() {

    const [open, setOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {

        const result = await handlePasswordUpdate(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Operación exitosa ✅' : 'Error al cambiar contraseña 😢';

        if (message) {
            toast({
                title,
                description: message,
                variant: result?.message ? 'default' : 'destructive',
            });
            if (result?.message) {
                setOpen(false)
            }
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button
                    className="relative hover:bg-muted flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
                    onClick={() => setOpen(true)}>
                    Cambiar contraseña
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Cambiar contraseña</SheetTitle>
                    <SheetDescription>
                        Ingresa tu información para cambiar contraseña
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="email" className="text-right">
                            Contraseña actual
                        </Label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            className="col-span-3"
                            placeholder="******"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="fullname" className="text-right">
                            Contraseña nueva
                        </Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
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
                            <SubmitButton title="Cambiar contraseña" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
