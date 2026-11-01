import React from "react";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  BsArrowLeft,
  BsBoxSeam,
  BsCalendarEvent,
  BsClock,
  BsGeoAlt,
  BsPersonCheck,
  BsTag,
} from "react-icons/bs";
import Container from "@/components/container/Container";
import EventJoinButton from "@/components/events/EventJoinButton";
import EventOwnerActions from "@/components/events/EventOwnerActions";
import { auth } from "@/lib/auth";
import { getEventById } from "@/lib/events";

type PageProps = {
  params: Promise<{ id: string }>;
};

const EVENT_RULES = [
  {
    icon: BsClock,
    title: "Arrive Early",
    text: "Reach the location 15 minutes before the scheduled time.",
  },
  {
    icon: BsPersonCheck,
    title: "Dress Comfortably",
    text: "Wear clothing suitable for physical work and distribution.",
  },
  {
    icon: BsBoxSeam,
    title: "Bring Supplies",
    text: "Carry any pre-arranged relief items if requested.",
  },
];

const EventDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  const isOwner =
    !!session?.user?.email &&
    !!event.organizerEmail &&
    session.user.email === event.organizerEmail;

  const today = new Date().toISOString().slice(0, 10);
  const isPast = event.date.slice(0, 10) < today;

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-background py-14 sm:py-20">
      <Container>
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 font-textFont text-[14px] font-semibold text-bodyText transition-colors duration-300 hover:text-brand"
        >
          <BsArrowLeft />
          Back to Events
        </Link>

        <article className="relative overflow-hidden rounded-3xl border border-borderSoft bg-background shadow-lg">
          <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
            <Image
              src={event.photoURL}
              alt={event.title}
              fill
              priority
              unoptimized={event.photoURL.startsWith("http")}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent lg:bg-linear-to-r lg:from-background lg:via-background/30 lg:to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col p-6 sm:p-10 lg:min-h-130 lg:p-12">
            <div className="lg:max-w-[48%]">
              <h1 className="font-headingFont text-[34px] italic leading-tight text-headingColor sm:text-[44px]">
                {event.title}
              </h1>

              <p className="mt-4 line-clamp-4 font-textFont text-[16px] leading-relaxed text-bodyText">
                {event.description?.trim() ||
                  "More details about this initiative will be shared soon."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-textFont text-[14px] font-medium text-bodyText">
                <span className="inline-flex items-center gap-2">
                  <BsGeoAlt className="text-brand" />
                  {event.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <BsCalendarEvent className="text-brand" />
                  {formattedDate}
                </span>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 font-textFont text-[12px] font-bold uppercase tracking-widest text-bodyText">
                  Event Rules
                </h2>

                <div className="grid grid-cols-1 divide-y divide-borderSoft sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {EVENT_RULES.map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="py-4 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0"
                    >
                      <Icon className="text-brand" size={18} />
                      <p className="mt-2 font-textFont text-[14px] font-bold text-headingColor">
                        {title}
                      </p>
                      <p className="mt-1 font-textFont text-[12px] leading-relaxed text-bodyText">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-60 lg:mt-auto lg:pt-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-borderSoft bg-background px-4 py-2 font-textFont text-[13px] font-bold text-headingColor">
                <BsTag className="text-brand" />
                {event.type}
              </span>

              {isOwner && event._id ? (
                <EventOwnerActions eventId={event._id} />
              ) : (
                <EventJoinButton isPast={isPast} />
              )}
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
};

export default EventDetailsPage;