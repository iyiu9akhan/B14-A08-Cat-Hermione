import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export interface EventItem {
  _id?: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  date: string;
  photoURL: string;
  description?: string;
  organizerEmail?: string;
}

const getAuthHeader = async (): Promise<Record<string, string> | null> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return null;

  return { authorization: "user loggedin" };
};

export async function getEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const events: EventItem[] = await res.json();

    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getMyEvents(email: string): Promise<EventItem[]> {
  try {
    const authHeader = await getAuthHeader();

    if (!authHeader) return [];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/manage/${encodeURIComponent(email)}`,
      { cache: "no-store", headers: authHeader },
    );

    if (!res.ok) return [];

    const events: EventItem[] = await res.json();

    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Failed to fetch my events:", error);
    return [];
  }
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    const authHeader = await getAuthHeader();

    if (!authHeader) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${encodeURIComponent(id)}`,
      { cache: "no-store", headers: authHeader },
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}