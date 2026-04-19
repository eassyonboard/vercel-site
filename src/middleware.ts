import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";

/**
 * Edge-safe gate: ensures a session cookie exists. JWT signature is verified
 * in Node (API routes + server components) via verifyAdminSession.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token || token.length < 10) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
