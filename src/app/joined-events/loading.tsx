import React from "react";
import Container from "@/components/container/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { EventCardSkeleton } from "@/components/events/EventCardSkeleton";

export default function JoinedEventsLoading() {
  return (
    <div className="bg-gradient-color py-12">
      <Container>
        <Skeleton className="mb-3 h-4 w-24 rounded-md" />
        <Skeleton className="mb-2 h-12 w-72 rounded-xl" />
        <Skeleton className="mb-10 h-5 w-96 max-w-full rounded-md" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}

