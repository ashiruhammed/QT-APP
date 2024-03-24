import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has("token");
  if (request.nextUrl.pathname.startsWith("/signup") && hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/" && !hasToken) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  if (request.nextUrl.pathname === "/preview" && !hasToken) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}
