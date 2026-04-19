import { cookies } from "next/headers";
import { verifyAdminSession } from "@/lib/auth";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";

export async function isAdminRequest(): Promise<boolean> {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifyAdminSession(token);
}
