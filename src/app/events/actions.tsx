
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getAuthHeaders } from "@/lib/auth-headers";

type ActionResult = { success: boolean; message?: string };

export type EventUpdateData = {
  title: string;
  type: string;
  date: string;
  location: string;
  photoURL: string;
  description: string;
};

export type CreateEventData = {
  title: string;
  type: string;
  date: string;
  location: string;
  photoURL: string;
  description: string;
  organizerEmail: string;
};

const getApiUrl = () => {
  const url =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.replace(/\/+$/, "");
};

const getUserEmail = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.email ?? null;
};

const refreshPages = () => {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/events/manage");
};

export async function createEvent(
  data: CreateEventData,
): Promise<{
  success: boolean;
  message?: string;
  insertedId?: string;
  acknowledged?: boolean;
}> {
  const email = await getUserEmail();

  if (!email) return { success: false, message: "Please login first." };

  // secured api || fetched token from another component (li/auth-headers)
  try {
    const res = await fetch(`${getApiUrl()}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { success: false, message: `Request failed with status ${res.status}` };
    }

    const result = await res.json();

    if (process.env.NODE_ENV !== "production") {
      console.log("Create Event Server Response:", result);
    }

    if (!result.insertedId) {
      return { success: false, message: "Event was not saved." };
    }

    refreshPages();
    return {
      success: true,
      acknowledged: result.acknowledged ?? true,
      insertedId: result.insertedId,
      message: `Event created successfully with ID: ${result.insertedId}`,
    };
  } catch {
    return { success: false, message: "Something went wrong." };
  }
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  const email = await getUserEmail();

  if (!email) return { success: false, message: "Please login first." };

  try {
    const res = await fetch(
      `${getApiUrl()}/events/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          ...(await getAuthHeaders()),
          "x-user-email": email,
        },
      },
    );

    if (res.status === 403) {
      return { success: false, message: "You can only delete your own events." };
    }

    if (!res.ok) return { success: false, message: "Failed to delete event." };

    refreshPages();
    return { success: true };
  } catch {
    return { success: false, message: "Something went wrong." };
  }
}

export async function updateEvent(
  id: string,
  data: EventUpdateData,
): Promise<ActionResult> {
  const email = await getUserEmail();

  if (!email) return { success: false, message: "Please login first." };

  try {
    const res = await fetch(
      `${getApiUrl()}/events/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeaders()),
          "x-user-email": email,
        },
        body: JSON.stringify(data),
      },
    );

    if (res.status === 403) {
      return { success: false, message: "You can only edit your own events." };
    }

    if (!res.ok) return { success: false, message: "Failed to update event." };

    refreshPages();
    revalidatePath(`/events/${id}`);
    return { success: true };
  } catch {
    return { success: false, message: "Something went wrong." };
  }
}
