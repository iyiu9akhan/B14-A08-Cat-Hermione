"use client";

import React, { useMemo, useState } from "react";
import {
  BsCalendarEvent,
  BsPlusCircle,
  BsSearch,
  BsXLg,
} from "react-icons/bs";
import EventCard from "@/components/events/EventsCard";
import EmptyCard from "@/components/events/EmptyCard";
import type { EventItem } from "@/lib/events";
import { ButtonLink } from "@/components/ui/ButtonLink";

type CardFilterProps = {
  events: EventItem[];
};

const ALL = "All";

const chipClass = (active: boolean) =>
  `inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 font-textFont text-[13px] font-semibold transition-colors duration-300 ${
    active
      ? "border-brand bg-brand text-textColor"
      : "border-borderSoft bg-background text-bodyText hover:border-brand hover:text-brand"
  }`;

const countClass = (active: boolean) =>
  `rounded-full px-2 py-0.5 text-[11px] font-bold ${
    active ? "bg-white/25" : "bg-brand/10 text-brand"
  }`;

const CardFilter = ({ events }: CardFilterProps) => {
  const [activeType, setActiveType] = useState(ALL);
  const [query, setQuery] = useState("");

  const types = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => counts.set(e.type, (counts.get(e.type) ?? 0) + 1));
    return Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [events]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events.filter((e) => {
      const matchesType = activeType === ALL || e.type === activeType;
      const matchesQuery =
        !q ||
        [e.title, e.location, e.type].some((field) =>
          field?.toLowerCase().includes(q),
        );

      return matchesType && matchesQuery;
    });
  }, [events, activeType, query]);

  const hasFilters = activeType !== ALL || query.trim() !== "";

  const clearFilters = () => {
    setActiveType(ALL);
    setQuery("");
  };

  if (events.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-borderSoft bg-background p-4 shadow-sm sm:p-5">
        <div className="relative">
          <BsSearch
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bodyText"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search events"
            placeholder="Search by title, location or type..."
            className="w-full rounded-xl border border-borderSoft bg-background py-3 pl-11 pr-11 font-textFont text-[15px] text-headingColor outline-none transition placeholder:text-bodyText/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-bodyText transition-colors duration-300 hover:bg-brand/10 hover:text-brand"
            >
              <BsXLg size={12} />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveType(ALL)}
            aria-pressed={activeType === ALL}
            className={chipClass(activeType === ALL)}
          >
            All
            <span className={countClass(activeType === ALL)}>
              {events.length}
            </span>
          </button>

          {types.map(([type, count]) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              aria-pressed={activeType === type}
              className={chipClass(activeType === type)}
            >
              {type}
              <span className={countClass(activeType === type)}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 mt-6 flex items-center justify-between gap-4 font-textFont text-[14px] text-bodyText">
        <p>
          Showing{" "}
          <span className="font-bold text-headingColor">{filtered.length}</span>{" "}
          of {events.length} events
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer font-semibold text-brand hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyCard
          icon={<BsSearch size={22} />}
          title="No events found"
          description="Try a different keyword or choose another category."
        >
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer rounded-full border border-brand px-6 py-2 font-textFont text-[14px] font-semibold text-brand transition-colors duration-300 hover:bg-brand hover:text-textColor"
          >
            Clear filters
          </button>
        </EmptyCard>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {filtered.map((item) => (
            <EventCard key={item._id ?? item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardFilter;
