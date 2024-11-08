import { useState } from "react";
import { Check, Copy, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GeneratorLinkShareProps {
    subtypes: { id: number; name: string }[];
}

export function GeneratorLinkShare({ subtypes }: GeneratorLinkShareProps) {
    const [selectedSubtype, setSelectedSubtype] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const generateUrl = () => {
        if (!selectedSubtype) return "";
        return `${window.location.origin}/projects/${slugify(selectedSubtype)}`;
    };

    const slugify = (text: string): string => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleCopy = () => {
        const url = generateUrl();
        if (url) {
            navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Vuelve al ícono original después de 2 segundos
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-fit mt-4">
                    Compartir enlace privado
                    <ExternalLinkIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Compartir enlace</DialogTitle>
                    <DialogDescription>
                        Selecciona un subtipo y genera un enlace para compartir.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Label htmlFor="subtype">Subtipo</Label>
                    <select
                        id="subtype"
                        value={selectedSubtype}
                        onChange={(e) => setSelectedSubtype(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Selecciona un subtipo</option>
                        {subtypes.map((subtype) => (
                            <option key={subtype.id} value={subtype.name}>
                                {subtype.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                value={generateUrl()}
                                readOnly
                                placeholder="El enlace se generará aquí"
                            />
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            className="px-3"
                            onClick={handleCopy}
                            disabled={!selectedSubtype}
                        >
                            {isCopied ? <Check /> : <Copy />}
                        </Button>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
