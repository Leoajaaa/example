import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withLocales } from "nextra/locales";

export const middleware = withLocales((request: NextRequest) => {
    // Getting cookies from the request using the `RequestCookies` API
    let cookie = request.cookies.get("is_login");

    if (cookie?.value === undefined) {
        //return NextResponse.redirect(new URL("/index", request.url));
        return NextResponse.redirect(new URL("/sign-in", request.url));
        //return NextResponse.redirect("https://v7.ecespro.com/");
    }

    return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/web/:path*", "/mobile/:path*", "/", "/tentang-kami"],
    // matcher: "/about/:path*",
};
