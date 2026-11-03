import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BsPeopleFill,
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

const notchW = 80; // box 64 + right 4 + gap 12
const notchH = 56; // box 40 + bottom 4 + gap 12
const rBox = 9; // same as the box corner radius (rounded-[9px])
const rIn = rBox + 12; // inner corner, concentric with the box corner

const solid = "linear-gradient(#000,#000)";
const outerCorner = `radial-gradient(circle at 0 0,#000 ${rBox - 0.5}px,transparent ${rBox}px)`;
const innerCorner = `radial-gradient(circle at 100% 100%,transparent ${rIn - 0.5}px,#000 ${rIn}px)`;

const layers = [
  {
    img: solid,
    size: `calc(100% - ${notchW + rBox - 1}px) 100%`,
    pos: "left 0 top 0",
  },
  {
    img: solid,
    size: `${rBox}px calc(100% - ${rBox - 1}px)`,
    pos: `right ${notchW}px top 0`,
  },
  {
    img: outerCorner,
    size: `${rBox}px ${rBox}px`,
    pos: `right ${notchW}px bottom 0`,
  },
  {
    img: solid,
    size: `${notchW - rBox + 1}px calc(100% - ${notchH - 1}px)`,
    pos: `right ${rBox}px top 0`,
  },
  {
    img: solid,
    size: `${rBox}px calc(100% - ${notchH + rBox - 1}px)`,
    pos: "right 0 top 0",
  },
  {
    img: outerCorner,
    size: `${rBox}px ${rBox}px`,
    pos: `right 0 bottom ${notchH}px`,
  },
  {
    img: innerCorner,
    size: `${rIn}px ${rIn}px`,
    pos: `right ${notchW - rIn}px bottom ${notchH - rIn}px`,
  },
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
    <div className="group">
      <Link href={`/events/${item._id}`}>
        <div>
          <div className="relative">
            <div
              style={notchMask}
              className="relative aspect-5/4 overflow-hidden rounded-3xl"
            >
              {item.photoURL ? (
                <Image
                  src={item.photoURL}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  unoptimized={item.photoURL.startsWith("http")}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-brand/10 text-brand">
                  <BsImage size={40} />
                </div>
              )}
            </div>

            <div
              aria-label={`${item.participantsCount ?? 0} participants joined`}
              className={`absolute bottom-1 right-1 flex size-14 w-16 h-10 gap-2 items-center justify-center rounded-[9px] text-gray-800 ${theme.circle}`}
            >
              <BsPeopleFill size={15} />
              <div className="font-textFont text-[18px] font-bold leading-none mt-0.5">
                {(item.participantsCount ?? 0) >= 100
                  ? "99+"
                  : (item.participantsCount ?? 0)}
              </div>
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

          <h3 className="mt-1 font-headingFont font-medium text-headingColor text-[28px]">
            {item.title}
          </h3>
        </div>
      </Link>

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
    </div>
  );
};

export default EventCard;