'use client';

import {
    BookImageIcon,
    BrushIcon,
    Menu,
    ShieldIcon,
    TypeIcon,
    User,
    UsersRoundIcon
} from "lucide-react";
import Link from "next/link";

import { handleLogout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { FormChangePassword } from "./admins/ChangePassword";

export default function Header() {

    const router = useRouter();

    async function handleButtonLogOut() {
        const result = await handleLogout();
        const message = result?.title ?? result?.error;
        if (message) {
            toast({
                title: result.title,
                description: result.description,
            });

            router.push('/auth/login');
        }
    }

    const pathname = usePathname();

    const getLinkClasses = (path: string) => {
        const isActive = pathname === path;

        // Si es la ruta activa, aplica los estilos de Coloristas
        return isActive
            ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
            : 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground';
    };


    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-lg font-semibold border-b pb-5"
                        >
                            <BrushIcon className="h-6 w-6" />
                            <span className="">Pentimiento</span>
                        </Link>

                        <Link
                            href="/dashboard/projects"
                            className={getLinkClasses('/dashboard/projects')}
                        >
                            <BookImageIcon className="h-4 w-4" />
                            Proyectos
                        </Link>

                        <Link
                            href="/dashboard/types"
                            className={getLinkClasses('/dashboard/types')}
                        >
                            <TypeIcon className="h-4 w-4" />
                            Tipos
                        </Link>

                        <Link
                            href="/dashboard/colorists"
                            className={getLinkClasses('/dashboard/colorists')}
                        >
                            <UsersRoundIcon className="h-4 w-4" />
                            <span className="">Coloristas</span>
                        </Link>

                        <Link
                            href="/dashboard/admins"
                            className={getLinkClasses('/dashboard/admins')}
                        >
                            <ShieldIcon className="h-4 w-4" />
                            <span className="">Admins</span>
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/">Ir a la home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <FormChangePassword />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleButtonLogOut}>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
