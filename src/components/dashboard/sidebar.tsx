'use client';

import { BookImageIcon, BrushIcon, ShieldIcon, UsersRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <BrushIcon className="h-6 w-6" />
                        <span>Pentimiento</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {/* Projects Link */}
                        <Link
                            href="/dashboard/projects"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname.endsWith('/projects')
                                    ? 'text-primary bg-muted'
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                        >
                            <BookImageIcon className="h-4 w-4" />
                            Projectos
                        </Link>

                        {/* Colorists Link */}
                        <Link
                            href="/dashboard/colorists"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname.endsWith('/colorists')
                                    ? 'text-primary bg-muted'
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                        >
                            <UsersRoundIcon className="h-4 w-4" />
                            Coloristas
                        </Link>

                        {/* Admins Link */}
                        <Link
                            href="/dashboard/admins"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname.endsWith('/admins')
                                    ? 'text-primary bg-muted'
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                        >
                            <ShieldIcon className="h-4 w-4" />
                            Admins
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
