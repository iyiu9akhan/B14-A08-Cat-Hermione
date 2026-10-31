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

const solid = "linear-gradient(#000,#000)";
const outerCorner = "radial-gradient(circle at 0 0,#000 23.5px,transparent 24px)";
const innerCorner = "radial-gradient(circle at 100% 100%,transparent 23.5px,#000 24px)";

const layers = [
  { img: solid, size: "calc(100% - 103px) 100%", pos: "left 0 top 0" },
  { img: solid, size: "24px calc(100% - 23px)", pos: "right 80px top 0" },
  { img: outerCorner, size: "24px 24px", pos: "right 80px bottom 0" },
  { img: solid, size: "58px calc(100% - 79px)", pos: "right 24px top 0" },
  { img: solid, size: "24px calc(100% - 103px)", pos: "right 0 top 0" },
  { img: outerCorner, size: "24px 24px", pos: "right 0 bottom 80px" },
  { img: innerCorner, size: "24px 24px", pos: "right 56px bottom 56px" },
];

const notchMask: React.CSSProperties = {
  maskImage: layers.map((l) => l.img).join(","),
  maskSize: layers.map((l) => l.size).join(","),
  maskPosition: layers.map((l) => l.pos).join(","),
  maskRepeat: "no-repeat",
  WebkitMaskImage: layers.map((l) => l.img).join(","),
  WebkitMaskSize: layers.map((l) => l.size).join(","),
  WebkitMaskPosition: layers.map((l) => l.pos).join(","),
  WebkitMaskRepeat: "no-repeat",
};

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const UpcomingEvents = () => {
  return (
    <div className="bg-background scroll-mt-20 py-20 bg-gradient-color" id="campaigns">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((item) => (
            <article key={item.slug} className="group">
              <div className="relative">
                <div
                  style={notchMask}
                  className="relative aspect-5/4 overflow-hidden rounded-3xl"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <Link
                  href={`/events/${item.slug}`}
                  aria-label={`View ${item.title}`}
                  className={`absolute bottom-3 right-3 flex size-14 items-center justify-center rounded-full text-gray-800 transition-transform duration-300 group-hover:rotate-45 ${item.circle}`}
                >
                  <BsArrowUpRight size={16} />
                </Link>
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

              <h3 className="mt-1 font-headingFont font-medium text-headingColor text-[28px]">
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
            className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3.5 font-textFont text-[14px] font-semibold text-textColor scale-100 hover:scale-105 transition-transform duration-300"
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