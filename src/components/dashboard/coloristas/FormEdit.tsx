'use client';

import { handleEditColorist } from "@/actions/colorist/update";
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
import { UserRoundPenIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    fullname: string,
    id: number
}

export function FormEdit({ fullname, id }: Props) {

    const [open, setOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {

        formData.append('id', id.toString());

        const result = await handleEditColorist(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Satisfactorio 😃' : 'Error 😮‍💨';

        if (message) {
            toast({
                title,
                description: message,
            });
            if (result?.message) {
                setOpen(false)
            };
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="rounded" onClick={() => setOpen(true)}>
                    <UserRoundPenIcon className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Vas a editar a <b className="uppercase">{fullname}</b></SheetTitle>
                    <SheetDescription>
                        Ingrese su nombre y apellido.
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="fullname" className="text-right">
                            Nombre completo
                        </Label>
                        <Input id="fullname" name="fullname" className="col-span-3" placeholder="Juan Lopez" />
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Editar colorista" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
