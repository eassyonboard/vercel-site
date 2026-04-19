import { jwtVerify, SignJWT } from "jose";
import { ADMIN_SESSION_COOKIE } from "./auth-constants";

export { ADMIN_SESSION_COOKIE };

function secretKey(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error("AUTH_SECRET must be set to at least 16 characters");
  }
  return new TextEncoder().encode(s);
}

export async function signAdminSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const s = process.env.AUTH_SECRET;
    if (!s || s.length < 16) return false;
    const { payload } = await jwtVerify(token, new TextEncoder().encode(s));
    return payload.role === "admin";
  } catch {
    return false;
  }
}
