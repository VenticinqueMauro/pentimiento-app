import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('pentimiento_app')?.value;

    if (token === undefined) return NextResponse.redirect(new URL('/auth/login', request.url));

    try {
        await jwtVerify(token, new TextEncoder().encode(`${process.env.JWT_KEY}`))
        return NextResponse.next()
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*'
    ],
};