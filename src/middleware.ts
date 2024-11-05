import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    // Manejo de solicitudes OPTIONS para permitir CORS en todas las rutas
    if (request.method === 'OPTIONS') {
        const response = new NextResponse(null, { status: 204 });
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response;
    }

    // Aplica autenticación solo en la ruta de `/dashboard`
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
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

    // Permitir el acceso a otras rutas sin autenticación
    return NextResponse.next();
}

// Configuración para aplicar el middleware solo en rutas específicas
export const config = {
    matcher: [
        '/dashboard/:path*', // Requiere autenticación
        '/portfolio/:path*', // No requiere autenticación, pero maneja OPTIONS
    ],
};
