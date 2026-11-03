"use server";

import { getAuthHeaders } from "@/lib/auth-headers";

const getApiUrl = () => {
  const url =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.replace(/\/+$/, "");
};

export async function updateUserProfile(data: {
  name: string;
  image: string;
}): Promise<{ success: boolean; message?: string; user?: { name: string; image: string } }> {
  try {
    const res = await fetch(`${getApiUrl()}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err.message || `Request failed with status ${res.status}` };
    }

    const result = await res.json();
    return { success: true, user: result.user };
  } catch {
    return { success: false, message: "Something went wrong." };
  }
}

