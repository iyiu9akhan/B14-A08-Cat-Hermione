export interface EventUser {
  name: string;
  email?: string;
  photoURL?: string;
}

export interface EventItem {
  _id?: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  date: string;
  photoURL: string;
  description?: string;
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

export async function getEventById(id: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e._id === id || e.slug === id) ?? null;
}
