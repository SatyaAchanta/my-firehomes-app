import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Implementing middleware here for route protection

export const middleware = async (request: NextRequest) => {

    // Add your middleware code here. 

    console.log("Admin dashboard middleware", request.url);

    // ignoring this middleware for server actions
    // because server actions only run on POST
    // page loads only run on GET
    if (request.method === "POST") {
        return NextResponse.next();
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url).toString());
    }

    const decodedToken = decodeJwt(token);

    if (!decodedToken.admin) {
        return NextResponse.redirect(new URL("/", request.url).toString());
    }

    return NextResponse.next();

};

export const config = {
    matcher: ["/admin-dashboard"],
};