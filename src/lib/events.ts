import { getAuthHeaders } from "@/lib/auth-headers";

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

const getApiUrl = () => {
  const url =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.replace(/\/$/, "");
};

export async function getEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${getApiUrl()}/events`, {
      cache: "no-store",
      headers: await getAuthHeaders(),
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
    const res = await fetch(
      `${getApiUrl()}/events/manage/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
        headers: await getAuthHeaders(),
      },
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
    const res = await fetch(
      `${getApiUrl()}/events/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
        headers: await getAuthHeaders(),
      },
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}
