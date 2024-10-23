import { Button } from "@/components/ui/button";

export default function page() {
    return (
        <main className="flex flex-1 flex-col gap-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Administradores</h1>
            </div>
            <div
                x-chunk="An empty state showing no products with a heading, description and a call to action to add a product."
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        No tienes Administradores
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Puedes empezar a visualizar tus administradores tan pronto como agregues uno.
                    </p>
                    <Button className="mt-4">Agregar administrador</Button>
                </div>
            </div>
        </main>
    )
}