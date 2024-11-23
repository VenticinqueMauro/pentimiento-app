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
    SelectValue,
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

    const generateUrl = (): string => {
        const baseUrl = `${window.location.origin}/projects`;
        if (selectedSubtype && selectedColorist) {
            return `${baseUrl}/${slugify(selectedSubtype)}/${slugify(selectedColorist)}`;
        } else if (selectedSubtype) {
            return `${baseUrl}/${slugify(selectedSubtype)}`;
        }
        return "";
    };

    const slugify = (text: string): string => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    };

    const handleCopy = () => {
        const url = generateUrl();
        if (url) {
            navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); 
        }
    };

    const resetFields = () => {
        setSelectedSubtype("");
        setSelectedColorist("");
        setIsCopied(false);
    };

    const handleSubtypeChange = (value: string) => {
        setSelectedSubtype(value);
        setSelectedColorist(""); 
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
                    <DialogTitle>Generar enlace privado</DialogTitle>
                    <DialogDescription>
                        Selecciona un subtipo y/o un colorista para generar un enlace único.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    {/* Selector de Subtipo */}
                    <Label htmlFor="subtype">Subtipo</Label>
                    <Select onValueChange={handleSubtypeChange} value={selectedSubtype}>
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

                    {/* Selector de Colorista (desactivado si no hay subtipo seleccionado) */}
                    <Label htmlFor="colorist">Colorista</Label>
                    <Select
                        onValueChange={setSelectedColorist}
                        value={selectedColorist}
                        disabled={!selectedSubtype} // Desactivar si no hay subtipo seleccionado
                    >
                        <SelectTrigger className="p-2 border rounded">
                            <SelectValue placeholder="Selecciona un colorista" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {colorists.map((colorist) => (
                                    <SelectItem key={colorist.id} value={colorist.fullname} className="capitalize">
                                        {colorist.fullname}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Generador de URL */}
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
