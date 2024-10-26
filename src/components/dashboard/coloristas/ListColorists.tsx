import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Colorist } from "@prisma/client"
import { AlertColoristDelete } from "./Delete"
import { FormEdit } from "./FormEdit"
import { FormCreate } from "./FormCreate"

interface Props {
    colorists: Colorist[]
}

export default function ListColorists({ colorists }: Props) {

    return (
        <div>
            <div className="flex items-center justify-between max-w-xl">
                <h1 className="text-lg font-semibold md:text-2xl">Lista de coloristas</h1>
                <FormCreate />
            </div>
            <Table className="max-w-xl mt-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-fit">Nombre Completo</TableHead>
                        <TableHead className="w-fit">
                            Editar
                        </TableHead>
                        <TableHead className="w-fit">
                            Eliminar
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        colorists.map((colorista) => (
                            <TableRow key={colorista.id}>
                                <TableCell className="capitalize font-semibold">{colorista.fullname}</TableCell>
                                <TableCell>
                                    <FormEdit fullname={colorista.fullname} id={colorista.id} />
                                </TableCell>
                                <TableCell>
                                    <AlertColoristDelete fullname={colorista.fullname} id={colorista.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>

    )
}
