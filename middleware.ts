import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Implementing middleware here for route protection

export const middleware = async (request: NextRequest) => {

    // ignoring this middleware for server actions
    // because server actions only run on POST
    // page loads only run on GET
    if (request.method === "POST") {
        console.log("Ignoring middleware for server actions");
        return NextResponse.next();
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    // When user is already logged in and tries to access login page
    if (token && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // When user is not logged in and tries to access admin
    if (!token && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.next();
    }

    // When user is not logged in and tries to access admin
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedToken = decodeJwt(token);

    // When user is not an admin
    if (!decodedToken.admin) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();

};

export const config = {
    matcher: ["/admin-dashboard", "/admin-dashboard/:path*", "/login"],
};