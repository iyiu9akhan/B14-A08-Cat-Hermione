"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type ActionResult = { success: boolean; message?: string };

export type EventUpdateData = {
  title: string;
  type: string;
  date: string;
  location: string;
  photoURL: string;
  description: string;
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

export async function deleteEvent(id: string): Promise<ActionResult> {
  const email = await getUserEmail();

  if (!email) return { success: false, message: "Please login first." };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          authorization: "user loggedin",
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
      `${process.env.NEXT_PUBLIC_API_URL}/events/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: "user loggedin",
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