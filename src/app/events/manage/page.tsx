import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BsCalendarEvent, BsPlusCircle } from "react-icons/bs";
import Container from "@/components/container/Container";
import EventCard from "@/components/events/EventsCard";
import EmptyCard from "@/components/events/EmptyCard";
import { auth } from "@/lib/auth";
import { getMyEvents } from "@/lib/events";

export const metadata = {
  title: "Manage Events | Hermione",
};

const ManageEventsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.email) redirect("/login");

  const events = await getMyEvents(session.user.email);

  return (
    <div className="bg-gradient-color py-12">
      <Container>
        <p className="mb-3 font-textFont text-[13px] font-bold uppercase tracking-widest text-brand">
          Dashboard
        </p>
        <h1 className="font-headingFont text-[40px] italic leading-tight text-headingColor sm:text-[48px]">
          Manage Events
        </h1>
        <p className="mt-2 mb-10 font-textFont text-[15px] font-medium text-bodyText">
          Events you have created. Only you can see this list.
        </p>

        {events.length === 0 ? (
          <EmptyCard
            icon={<BsCalendarEvent size={24} />}
            title="You haven't created any events yet"
            description="Start a winter clothes drive, food distribution, or cleanup campaign and it will show up here."
          >
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl bg-brand px-7 py-3 font-textFont text-[14px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <BsPlusCircle size={17} />
              Create an Event
            </Link>
          </EmptyCard>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {events.map((item) => (
              <EventCard key={item._id ?? item.slug} item={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ManageEventsPage;