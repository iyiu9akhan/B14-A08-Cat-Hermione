export interface EventItem {
  _id?: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  date: string;
  photoURL: string;
}

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