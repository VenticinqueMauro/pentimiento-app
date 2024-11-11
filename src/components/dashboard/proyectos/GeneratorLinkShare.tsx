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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Check, Copy, ExternalLinkIcon } from "lucide-react";
import { useState } from "react";

interface GeneratorLinkShareProps {
    subtypes: { id: number; name: string }[];
    colorists: { id: number; fullname: string }[];
}

export function GeneratorLinkShare({ subtypes, colorists }: GeneratorLinkShareProps) {
    const [selectedSubtype, setSelectedSubtype] = useState<string>("");
    const [selectedColorist, setSelectedColorist] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const generateUrl = () => {
        if (selectedSubtype) {
            return `${window.location.origin}/projects/${slugify(selectedSubtype)}`;
        } else if (selectedColorist) {
            return `${window.location.origin}/projects/${slugify(selectedColorist)}`;
        }
        return "";
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

    const resetFields = () => {
        setSelectedSubtype("");
        setSelectedColorist("");
        setIsCopied(false);
    };

    const handleSubtypeChange = (value: string) => {
        setSelectedSubtype(value);
        if (value) setSelectedColorist(""); // Reset colorist if subtype is selected
    };

    const handleColoristChange = (value: string) => {
        setSelectedColorist(value);
        if (value) setSelectedSubtype(""); // Reset subtype if colorist is selected
    };

    return (
        <Dialog onOpenChange={(isOpen) => !isOpen && resetFields()}>
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
                        Selecciona un subtipo o un colorista para generar un enlace para compartir.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Label htmlFor="subtype">Subtipo</Label>
                    <Select onValueChange={handleSubtypeChange} value={selectedSubtype} disabled={!!selectedColorist}>
                        <SelectTrigger className="p-2 border rounded">
                            <SelectValue placeholder="Selecciona un subtipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {subtypes.map((subtype) => (
                                    <SelectItem key={subtype.id} value={subtype.name}>
                                        {subtype.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Label htmlFor="colorist">Colorista</Label>
                    <Select onValueChange={handleColoristChange} value={selectedColorist} disabled={!!selectedSubtype}>
                        <SelectTrigger className="p-2 border rounded">
                            <SelectValue placeholder="Selecciona un colorista" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {colorists.map((colorist) => (
                                    <SelectItem key={colorist.id} value={colorist.fullname}>
                                        {colorist.fullname}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

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
                            disabled={!selectedSubtype && !selectedColorist}
                        >
                            {isCopied ? <Check /> : <Copy />}
                        </Button>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button variant="outline" type="button" onClick={resetFields}>
                            Resetear formulario
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