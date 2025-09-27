"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(): Promise<any | null> {
  const allCookies = await cookies();
  const tokenValue =
    allCookies.get("next-auth.session-token")?.value ||
    allCookies.get("__Secure-next-auth.session-token")?.value;

  if (!tokenValue) return null;

  const decoded = await decode({
    token: tokenValue,
    secret: process.env.NEXTAUTH_SECRET!,
  });

 
  return decoded;
}
