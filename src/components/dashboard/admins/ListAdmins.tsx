import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { User } from "@prisma/client"
import { FormCreate } from "./FormCreate"
import { AlertAdminsDelete } from "./Delete"

interface Props {
    admins: User[]
}

export default function ListAdmins({ admins }: Props) {

    return (
        <div>
            <div className="flex items-center justify-between max-w-xl">
                <h1 className="text-lg font-semibold md:text-2xl">Lista de admins</h1>
                <FormCreate />
            </div>
            <Table className="max-w-xl mt-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-fit">Email</TableHead>
                        <TableHead className="w-fit">Nombre Completo</TableHead>
                        {/* <TableHead className="w-fit">
                            Editar
                        </TableHead> */}
                        <TableHead className="w-fit">
                            Eliminar
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell className="">{admin.email}</TableCell>
                                <TableCell className="capitalize font-semibold">{admin.fullname}</TableCell>
                                {/* <TableCell>
                                    editar
                                </TableCell> */}
                                <TableCell>
                                    <AlertAdminsDelete email={admin.email} id={admin.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>

    )
}
