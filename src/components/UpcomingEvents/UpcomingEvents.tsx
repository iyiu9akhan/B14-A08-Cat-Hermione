import React from "react";
import Container from "../container/Container";
import EventCard from "@/components/events/EventsCard";
import EmptyCard from "@/components/events/EmptyCard";
import { getEvents } from "@/lib/events";
import { BsArrowRight, BsCalendarEvent, BsPlusCircle } from "react-icons/bs";
import { ButtonLink } from "@/components/ui/ButtonLink";

const UpcomingEvents = async () => {
  // api fetching here 
  const allEvents = await getEvents();

  const today = new Date().toISOString().slice(0, 10);
  const events = allEvents
    .filter((item) => item.date.slice(0, 10) >= today)
    .slice(0, 3);

  return (
    <div
      className="bg-background scroll-mt-20 py-20 bg-gradient-color"
      id="campaigns"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 font-textFont text-[13px] font-bold uppercase tracking-widest text-brand">
            CAMPAIGNS
          </p>
          <h2 className="font-headingFont italic text-headingColor text-[48px] leading-tight max-w-130 mb-4">
            Upcoming Events
          </h2>
          <p className="font-textFont text-bodyText text-[18px] font-medium max-w-130 mb-16 opacity-80">
            Join our donation events and help us deliver food, clothes and
            essentials to people who need them most.
          </p>
        </div>

        {events.length === 0 ? (
          <EmptyCard
            icon={<BsCalendarEvent size={24} />}
            title="No events found right now"
            description="Please check back soon. You can also take the initiative and create a winter clothes drive, blanket distribution, or cleanup campaign in your neighborhood."
          >
            <ButtonLink
              href="/create-event"
              icon={<BsPlusCircle size={17} />}
              spinnerSize={17}
              className="inline-flex items-center gap-2 rounded-b-2xl rounded-r-2xl bg-brand px-7 py-3 font-textFont text-[14px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Create an Event
            </ButtonLink>
          </EmptyCard>
        ) : (
          <>
            <div className="grid grid-cols-1  gap-y-20 md:gap-8 md:grid-cols-3 ">
              {events.map((item) => (
                <EventCard key={item._id ?? item.slug} item={item} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <ButtonLink
                href="/events"
                icon={<BsArrowRight />}
                iconPosition="right"
                spinnerSize={16}
                className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3.5 font-textFont text-[14px] font-semibold text-textColor scale-100 hover:scale-105 transition-transform duration-300"
              >
                View all events
              </ButtonLink>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default UpcomingEvents;
