import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BsArrowUpRight,
  BsGeoAltFill,
  BsCalendarEvent,
  BsImage,
} from "react-icons/bs";
import type { EventItem } from "@/lib/events";

const typeThemes: Record<string, { badge: string; circle: string }> = {
  Food: {
    badge:
      "bg-orange-200 text-orange-800 dark:bg-orange-400/20 dark:text-orange-300",
    circle: "bg-orange-200 dark:bg-orange-300",
  },
  Clothing: {
    badge:
      "bg-green-200 text-green-800 dark:bg-green-400/20 dark:text-green-300",
    circle: "bg-green-200 dark:bg-green-300",
  },
  Education: {
    badge:
      "bg-purple-200 text-purple-800 dark:bg-purple-400/20 dark:text-purple-300",
    circle: "bg-purple-200 dark:bg-purple-300",
  },
  Health: {
    badge: "bg-sky-200 text-sky-800 dark:bg-sky-400/20 dark:text-sky-300",
    circle: "bg-sky-200 dark:bg-sky-300",
  },
  Shelter: {
    badge: "bg-rose-200 text-rose-800 dark:bg-rose-400/20 dark:text-rose-300",
    circle: "bg-rose-200 dark:bg-rose-300",
  },
  Donation: {
    badge:
      "bg-amber-200 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300",
    circle: "bg-amber-200 dark:bg-amber-300",
  },
  Cleanup: {
    badge: "bg-teal-200 text-teal-800 dark:bg-teal-400/20 dark:text-teal-300",
    circle: "bg-teal-200 dark:bg-teal-300",
  },
  Plantation: {
    badge: "bg-lime-200 text-lime-800 dark:bg-lime-400/20 dark:text-lime-300",
    circle: "bg-lime-200 dark:bg-lime-300",
  },
};

const defaultTheme = {
  badge: "bg-gray-200 text-gray-800 dark:bg-gray-400/20 dark:text-gray-300",
  circle: "bg-gray-200 dark:bg-gray-300",
};

const getTheme = (type: string) => typeThemes[type] ?? defaultTheme;

const solid = "linear-gradient(#000,#000)";
const outerCorner =
  "radial-gradient(circle at 0 0,#000 23.5px,transparent 24px)";
const innerCorner =
  "radial-gradient(circle at 100% 100%,transparent 23.5px,#000 24px)";

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

const formatDate = (value?: string) => {
  if (!value) return "Date not set";

  return new Date(`${value.slice(0, 10)}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );
};

const EventCard = ({ item }: { item: EventItem }) => {
  const theme = getTheme(item.type);

  return (
    <article className="group">
      <div className="relative">
        <div
          style={notchMask}
          className="relative aspect-5/4 overflow-hidden rounded-3xl"
        >
          {item.photoURL  ? (
            <Image
              src={item.photoURL }
              alt={item.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              unoptimized={item.photoURL .startsWith("http")}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-brand/10 text-brand">
              <BsImage size={40} />
            </div>
          )}
        </div>

        <Link
          href={`/events/${item._id}`}
          aria-label={`View ${item.title}`}
          className={`absolute bottom-3 right-3 flex size-14 items-center justify-center rounded-full text-gray-800 transition-transform duration-300 group-hover:rotate-45 ${theme.circle}`}
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
          className={`rounded-md px-2.5 py-1 font-textFont text-[11px] font-bold uppercase tracking-wide ${theme.badge}`}
        >
          {item.type}
        </span>
        <Link
          href={`/events/${item._id}`}
          className="font-textFont text-[14px] font-semibold text-brand hover:underline"
        >
          View Event
        </Link>
      </div>
    </article>
  );
};

export default EventCard;