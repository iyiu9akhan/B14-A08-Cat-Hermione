import React from "react";
import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";
import Container from "@/components/container/Container";
import CardFilter from "@/components/events/CardFilter";
import { getEvents } from "@/lib/events";

export const metadata = {
  title: "All Events | Hermione",
};

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <div className="bg-gradient-color py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-textFont text-[13px] font-bold uppercase tracking-widest text-brand">
              EVENTS
            </p>
            <h1 className="font-headingFont italic text-headingColor text-[48px] leading-tight mb-4">
              All Events
            </h1>
            <p className="font-textFont text-bodyText text-[18px] font-medium max-w-130 opacity-80">
              Browse every donation and community event, and find one near you
              to join.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-b-2xl rounded-r-2xl bg-brand px-7 py-3.5 font-textFont text-[14px] font-bold text-textColor shadow-lg transition-transform duration-300 hover:scale-105 md:self-auto"
          >
            <BsPlusCircle size={18} />
            Create Event
          </Link>
        </div>

        <CardFilter events={events} />
      </Container>
    </div>
  );
};

export default EventsPage;