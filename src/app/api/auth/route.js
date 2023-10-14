import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// create a signed jwt token
export const POST = async (request) => {
    const body = await request.json();
    const secret = new TextEncoder().encode(process.env.jwt_secret);
    const alg = 'HS256';

    const token = await new SignJWT(body)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secret);

    cookies().set({
        name: 'token-ca',
        value: `Bearer${token}`,
        secure: true,
        httpOnly: true,
    });

    return NextResponse.json({ message: 'Token created and sent with cookies.' }, { status: 200 })
}

// remove the token on sign out
export const DELETE = async () => {
    const response = new NextResponse(
        JSON.stringify({ message: 'Logged out!' }),
        { status: 200 }
    );

    response.cookies.set({
        name: 'token-ca',
        value: '',
        expires: Date.now()
    })

    return response;
}