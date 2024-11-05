import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    // Manejo de solicitudes OPTIONS para permitir CORS
    if (request.method === 'OPTIONS') {
        const response = new NextResponse(null, { status: 204 });
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response;
    }

    // Verificación del JWT para otras solicitudes
    const token = request.cookies.get('pentimiento_app')?.value;

    if (token === undefined) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(`${process.env.JWT_KEY}`));
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}

// Configuración del middleware para aplicar en todas las rutas necesarias
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/portfolio/:path*', // Añadido para asegurar que también cubre las rutas de "portfolio"
    ],
};
