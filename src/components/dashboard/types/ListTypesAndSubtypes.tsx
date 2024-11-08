import { TypeWithRelations } from "@/app/dashboard/types/page";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Subtype } from "@prisma/client";
import React from "react";
import { AlertTypeDelete } from "./Delete";
import { FormCreate } from "./FormCreate";
import { FormEditTypeAndSubtype } from "./FormEdit";

interface Props {
    types: TypeWithRelations[];
    subtypesWithoutType: Subtype[];
}

export default function ListTypesAndSubtypes({ types, subtypesWithoutType }: Props) {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between max-w-xl mb-6">
                <h1 className="hidden lg:block text-lg font-semibold md:text-2xl">
                    Lista de Tipos y Subtipos
                </h1>
                <FormCreate />
            </div>
            <Table className="max-w-xl mt-4 capitalize">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left font-bold text-gray-600">Tipo</TableHead>
                        <TableHead className="text-left font-bold text-gray-600">Subtipos</TableHead>
                        <TableHead className="text-left font-bold text-gray-600">Editar</TableHead>
                        <TableHead className="text-left font-bold text-gray-600">Eliminar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Mostrar tipos y sus subtipos */}
                    {types.map((type) => (
                        <React.Fragment key={type.id}>
                            {/* Fila para el Tipo */}
                            <TableRow className="border-b border-gray-200">
                                <TableCell className="py-4 text-base font-medium text-gray-800">
                                    {type.name}
                                </TableCell>
                                <TableCell>
                                    {type.subtypes.length > 0 ? (
                                        <ul className="ml-4 list-disc text-gray-700">
                                            {type.subtypes.map((subtype) => (
                                                <li key={subtype.id} className="py-1">
                                                    {subtype.name}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-gray-500">Sin subtipo</span>
                                    )}
                                </TableCell>
                                <TableCell className="py-4 text-base font-medium text-gray-800">
                                    <FormEditTypeAndSubtype
                                        typeId={type.id}
                                        typeName={type.name}
                                        subtypes={type.subtypes}
                                    />
                                </TableCell>
                                <TableCell className="py-4 text-base font-medium text-gray-800">
                                    <AlertTypeDelete typeId={type.id} typeName={type.name} />
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                    {/* Mostrar subtipos sin tipo asociado */}
                    {subtypesWithoutType.length > 0 && (
                        <>
                            <TableRow>
                                <TableCell colSpan={4} className="bg-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Subtipos sin tipo asociado
                                    </h2>
                                </TableCell>
                            </TableRow>
                            {subtypesWithoutType.map((subtype) => (
                                <TableRow key={subtype.id} className="border-b border-gray-200">
                                    <TableCell className="py-4 text-base font-medium text-gray-800">
                                        {/* Sin tipo */}
                                        <span className="text-gray-500">Sin tipo</span>
                                    </TableCell>
                                    <TableCell className="py-4 text-base font-medium text-gray-800">
                                        {subtype.name}
                                    </TableCell>
                                    <TableCell className="py-4 text-base font-medium text-gray-800">
                                        {/* Botón para editar el subtipo */}
                                        {/* <FormEditTypeAndSubtype
                                            subtypeId={subtype.id}
                                            subtypeName={subtype.name}
                                        /> */}
                                    </TableCell>
                                    <TableCell className="py-4 text-base font-medium text-gray-800">
                                        {/* Botón para eliminar el subtipo */}
                                        {/* <AlertTypeDelete subtypeId={subtype.id} subtypeName={subtype.name} /> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
