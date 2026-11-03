import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-borderSoft/70 dark:bg-borderSoft/40 ${className}`}
      {...props}
    />
  );
}

