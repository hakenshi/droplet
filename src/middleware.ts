import { NextRequest, NextResponse } from "next/server";

const publicPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");

    console.log('token', token);
    console.log("pathname", request.nextUrl.pathname);

    if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/']
};