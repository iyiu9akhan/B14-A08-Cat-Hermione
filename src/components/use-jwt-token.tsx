"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

/**
 * Custom hook that:
 * 1. Gets JWT token on mount
 * 2. Logs it to browser console
 * 3. Provides the token for use in API calls
 */
export function useJwtToken() {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJwtToken() {
      try {
        // Get JWT token from better-auth client
        const result = await authClient.getToken();
        const token = result?.token ?? null;
        setJwtToken(token);

        // Log to browser console 👇
        console.log("🔐 JWT Token loaded in browser:");
        console.log("   - Token:", token ? token.substring(0, 30) + "..." : "null");
        console.log("   - Length:", token?.length ?? 0);

        // Also log decoded payload info if token exists
        if (token) {
          try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(window.atob(base64));
            console.log("   - Payload:", payload?.email || payload?.sub);
          } catch (e) {
            console.log("   - Could not decode payload");
          }
        }
      } catch (error) {
        console.error("❌ Failed to get JWT token:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJwtToken();
  }, []);

  return { jwtToken, isLoading };
}