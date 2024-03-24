import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has("token");
  const pathname = request.nextUrl.pathname;
  const authRoutes = ["/", "/preview"];

  if (pathname.startsWith("/signup") && hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authRoutes.includes(pathname) && !hasToken) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}
