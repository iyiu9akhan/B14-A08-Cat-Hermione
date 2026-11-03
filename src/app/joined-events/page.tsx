import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BsCalendarCheck, BsCalendarEvent } from "react-icons/bs";
import Container from "@/components/container/Container";
import EventCard from "@/components/events/EventsCard";
import EmptyCard from "@/components/events/EmptyCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { auth } from "@/lib/auth";
import { getJoinedEvents } from "@/lib/events";

export const metadata = {
  title: "Joined Events | Hermione",
};

export const dynamic = "force-dynamic";

const JoinedEventsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.email) redirect("/login");

  const events = await getJoinedEvents(session.user.email);

  return (
    <div className="bg-gradient-color py-12">
      <Container>
        <p className="mb-3 font-textFont text-[13px] font-bold uppercase tracking-widest text-brand">
          My Activity
        </p>
        <h1 className="font-headingFont text-[40px] italic leading-tight text-headingColor sm:text-[48px]">
          Joined Events
        </h1>
        <p className="mt-2 mb-10 font-textFont text-[15px] font-medium text-bodyText">
          Events you have signed up for. Leave an event from its detail page to
          remove it from this list.
        </p>

        {events.length === 0 ? (
          <EmptyCard
            icon={<BsCalendarEvent size={24} />}
            title="You haven't joined any events yet"
            description="Browse upcoming donation and community events and join one near you."
          >
            <ButtonLink
              href="/events"
              icon={<BsCalendarCheck size={17} />}
              spinnerSize={17}
              className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl bg-brand px-7 py-3 font-textFont text-[14px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Browse Events
            </ButtonLink>
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

export default JoinedEventsPage;

