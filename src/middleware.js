import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = async (request) => {
    const { pathname } = request.nextUrl;
    const isPath = (path) => pathname.startsWith(path);

    try {
        const token = request.cookies.get('token-ca')?.value;
        if (!token) throw "A token must be sent with cookie";
        else if (!token.startsWith('Bearer')) throw "Invalid token";

        const secret = new TextEncoder().encode(process.env.jwt_secret);
        const { payload } = await jwtVerify(token.split('Bearer')[1], secret);
        console.log('payload from middleware.js', payload);
        // redirect already authenticated user
        if (isPath('/sign-in') || isPath('sign-up')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next();
    } catch (error) {
        // not necessary in case of error
        if (isPath('/sign-in') || isPath('sign-up')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/sign-in/:path*',
    ],
}