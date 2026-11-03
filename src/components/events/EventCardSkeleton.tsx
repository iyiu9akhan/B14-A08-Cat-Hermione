import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export function EventCardSkeleton() {
  return (
    <article className="group">
      <div className="relative">
        <Skeleton className="aspect-5/4 w-full rounded-3xl" />
        <Skeleton className="absolute bottom-3 right-3 size-14 rounded-full" />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-4 w-28 rounded-md" />
      </div>
      <Skeleton className="mt-3 h-8 w-3/4 rounded-lg" />
      <div className="mt-4 flex items-center gap-3">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>
    </article>
  );
}

