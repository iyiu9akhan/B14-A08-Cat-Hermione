"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

type BetterAuthTokenClient = {
  token: () => Promise<{
    data: { token: string } | null;
    error: { message?: string; status?: number } | null;
  }>;
};

export function useJwtToken() {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchJwtToken() {
      if (!authClient) {
        if (isMounted) {
          setError("authClient not initialized");
          setIsLoading(false);
        }
        return;
      }

      try {
        const client = authClient as unknown as BetterAuthTokenClient;
        const { data, error: tokenError } = await client.token();

        if (!isMounted) return;

        if (tokenError) {
          setError(tokenError.message ?? "Failed to retrieve JWT token");
          setJwtToken(null);
          return;
        }

        const token = data?.token ?? null;
        setJwtToken(token);

        if (token && process.env.NODE_ENV !== "production") {
          console.log("🔐 JWT Token loaded in browser:", token);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchJwtToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return { jwtToken, isLoading, error };
}
