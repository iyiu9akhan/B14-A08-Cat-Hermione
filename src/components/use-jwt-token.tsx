"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

/**
 * Custom hook that safely retrieves JWT token from better-auth client.
 * Handles cases where user is not logged in or token is unavailable.
 */
export function useJwtToken() {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJwtToken() {
      // Check if authClient is available
      if (!authClient) {
        setError("authClient not initialized");
        setIsLoading(false);
        return;
      }

      try {
        let result: { token?: string } | null = null;

        // Cast authClient to 'any' to bypass TS2339 if the plugin type isn't inferred
        const client = authClient as any;

        // Safe call - check if getToken exists and is a function
        if (typeof client.getToken === "function") {
          result = await client.getToken();
        }

        // Extract token safely
        const token = result?.token ?? null;
        setJwtToken(token);

        // Log to browser console 👇
        console.log("🔐 JWT Token loaded in browser:");
        console.log(
          "   - Token:",
          token ? token.substring(0, 30) + "..." : "null"
        );
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
      } catch (error: any) {
        console.error("❌ Failed to get JWT token:", error);
        setError(error.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJwtToken();
  }, [], );

  return { jwtToken, isLoading, error };
}