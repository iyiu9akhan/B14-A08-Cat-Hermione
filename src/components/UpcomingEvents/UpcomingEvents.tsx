import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../container/Container";
import {
  BsArrowUpRight,
  BsArrowRight,
  BsGeoAltFill,
  BsCalendarEvent,
} from "react-icons/bs";

const typeStyles = {
  Food: "bg-orange-200 text-orange-800 dark:bg-orange-400/20 dark:text-orange-300",
  Clothing:
    "bg-green-200 text-green-800 dark:bg-green-400/20 dark:text-green-300",
  Education:
    "bg-purple-200 text-purple-800 dark:bg-purple-400/20 dark:text-purple-300",
  Health: "bg-sky-200 text-sky-800 dark:bg-sky-400/20 dark:text-sky-300",
  Shelter: "bg-rose-200 text-rose-800 dark:bg-rose-400/20 dark:text-rose-300",
};

type EventType = keyof typeof typeStyles;

const events: {
  slug: string;
  title: string;
  location: string;
  type: EventType;
  date: string;
  image: string;
  circle: string;
}[] = [
  {
    slug: "food-for-every-family",
    title: "Food for Every Family",
    location: "Dhaka",
    type: "Food",
    date: "2026-11-20",
    image: "/UpComingEvents/food-distribution.jpg",
    circle: "bg-orange-200 dark:bg-orange-300",
  },
  {
    slug: "warm-winter-campaign",
    title: "Warm Winter Campaign",
    location: "Rangpur",
    type: "Clothing",
    date: "2026-12-05",
    image: "/UpComingEvents/winter-warm-clothes.jpg",
    circle: "bg-green-200 dark:bg-green-300",
  },
  {
    slug: "school-kits-for-children",
    title: "School Kits for Children",
    location: "Sylhet",
    type: "Education",
    date: "2026-12-18",
    image: "/UpComingEvents/school-kits.jpg",
    circle: "bg-purple-200 dark:bg-purple-300",
  },
];

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const UpcomingEvents = () => {
  return (
    <div className="bg-background py-20 bg-gradient-color">
      <Container>
        <h2 className="font-headingFont text-headingColor text-[48px] leading-tight max-w-130 mb-4">
          Upcoming Events
        </h2>
        <p className="font-textFont text-bodyText text-[18px] font-medium max-w-130 mb-16 opacity-80">
          Join our donation events and help us deliver food, clothes and
          essentials to people who need them most.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((item) => (
            <article key={item.slug} className="group">
              <div className="relative">
                <div className="relative aspect-5/4 overflow-hidden rounded-3xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-px -right-px rounded-tl-3xl bg-background p-2 pl-2.5 pt-2.5">
                  <span
                    aria-hidden
                    className="absolute bottom-[calc(100%-1px)] right-0 size-6 bg-[radial-gradient(circle_at_0_0,transparent_23.5px,var(--background)_24px)]"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-0 right-[calc(100%-1px)] size-6 bg-[radial-gradient(circle_at_0_0,transparent_23.5px,var(--background)_24px)]"
                  />

                  <Link
                    href={`/events/${item.slug}`}
                    aria-label={`View ${item.title}`}
                    className={`flex size-14 items-center justify-center rounded-full text-gray-800 transition-transform duration-300 group-hover:rotate-45 ${item.circle}`}
                  >
                    <BsArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-textFont text-[13px] font-semibold text-bodyText opacity-70">
                <span className="flex items-center gap-1.5">
                  <BsGeoAltFill className="text-brand" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <BsCalendarEvent className="text-brand" />
                  {formatDate(item.date)}
                </span>
              </div>

              <h3 className="mt-1 font-textFont font-semibold text-headingColor text-[28px]">
                {item.title}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-1 font-textFont text-[11px] font-bold uppercase tracking-wide ${typeStyles[item.type]}`}
                >
                  {item.type}
                </span>
                <Link
                  href={`/events/${item.slug}`}
                  className="font-textFont text-[14px] font-semibold text-brand hover:underline"
                >
                  View Event
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 rounded-full bg-headingColor px-8 py-3.5 font-textFont text-[14px] font-semibold text-background transition hover:opacity-90"
          >
            View all events
            <BsArrowRight />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default UpcomingEvents;
