import React from "react";
import Container from "../container/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { EventCardSkeleton } from "../events/EventCardSkeleton";

export default function UpcomingEventsSkeleton() {
  return (
    <div
      className="bg-background scroll-mt-20 py-20 bg-gradient-color"
      id="campaigns"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <Skeleton className="mb-3 h-4 w-24 rounded-md" />
          <Skeleton className="mb-4 h-12 w-80 max-w-full rounded-xl" />
          <Skeleton className="mb-16 h-5 w-120 max-w-full rounded-md" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
      </Container>
    </div>
  );
}

