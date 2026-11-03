import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  try {
    const jwt = await auth.api.getToken({ headers: await headers() });

    if (!jwt?.token) return {};

    if (process.env.NODE_ENV !== "production") {
      console.log("jwtToken:", jwt.token);
    }

    return { authorization: `Bearer ${jwt.token}` };
  } catch {
    return {};
  }
}
