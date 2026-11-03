import React from "react";
import Container from "@/components/container/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function EventDetailsLoading() {
  return (
    <div className="bg-background py-14 sm:py-20">
      <Container>
        <Skeleton className="mb-6 h-5 w-32 rounded-md" />

        <article className="relative overflow-hidden rounded-3xl border border-borderSoft bg-background shadow-lg">
          {/* Image block */}
          <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
            <Skeleton className="h-full w-full rounded-none" />
            <Skeleton className="absolute bottom-4 right-4 h-8 w-28 rounded-full" />
          </div>

          {/* Details block */}
          <div className="relative z-10 flex flex-col p-6 sm:p-10 lg:min-h-130 lg:p-12">
            <div className="lg:max-w-[48%]">
              {/* Title */}
              <Skeleton className="h-10 w-4/5 rounded-xl sm:h-12" />

              {/* Description */}
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/6 rounded-md" />
              </div>

              {/* Location & Date */}
              <div className="mt-5 flex flex-wrap items-center gap-6">
                <Skeleton className="h-5 w-36 rounded-md" />
                <Skeleton className="h-5 w-36 rounded-md" />
              </div>

              {/* Event Rules */}
              <div className="mt-8">
                <Skeleton className="mb-4 h-4 w-28 rounded-md" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-10 flex flex-wrap items-center gap-6 lg:mt-auto lg:pt-10">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}

