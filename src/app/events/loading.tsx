import React from "react";
import Container from "@/components/container/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { EventCardSkeleton } from "@/components/events/EventCardSkeleton";

export default function EventsLoading() {
  return (
    <div className="bg-gradient-color py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Skeleton className="mb-3 h-4 w-24 rounded-md" />
            <Skeleton className="mb-4 h-12 w-64 rounded-xl" />
            <Skeleton className="h-5 w-96 max-w-full rounded-md" />
          </div>
          <Skeleton className="h-12 w-44 rounded-b-2xl rounded-r-2xl" />
        </div>

        {/* Filter bar placeholder */}
        <Skeleton className="mb-12 h-28 w-full rounded-2xl" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}

