import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signAdminSession } from "@/lib/auth";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";

export async function POST(request: Request) {
  try {
    if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 16) {
      return NextResponse.json(
        { error: "Server is not configured for admin login (AUTH_SECRET)." },
        { status: 503 },
      );
    }
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Server is not configured (ADMIN_PASSWORD)." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { password?: string };
    if (body.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAdminSession();
    cookies().set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin login error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
